import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Download, Trash2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

interface GeneratedImage {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
}

export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const generateImageMutation = trpc.image.generate.useMutation();
  const getImagesQuery = trpc.image.getImages.useQuery();

  // Load user's previous images
  const previousImages = getImagesQuery.data || [];
  const isLoadingImages = getImagesQuery.isLoading;
  const imageError = getImagesQuery.error;

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    try {
      const result = await generateImageMutation.mutateAsync({ prompt });
      const newImage: GeneratedImage = {
        id: result.id,
        imageUrl: result.url || '',
        prompt,
        createdAt: new Date(),
      };
      setGeneratedImages((prev) => [newImage, ...prev]);
      setPrompt('');
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image. Please try again.');
    }
  };

  const handleDownloadImage = async (url: string, prompt: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `ai-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
      toast.success('Image downloaded!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Prompt copied to clipboard!');
  };

  const allImages = [...generatedImages, ...previousImages];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            AI Image Generator
          </h1>
          <p className="text-muted-foreground">
            Describe your vision and let AI bring it to life
          </p>
        </div>
      </section>

      {/* Generator Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Input Form */}
            <div className="glass-effect p-8 rounded-2xl mb-12">
              <form onSubmit={handleGenerateImage} className="space-y-6">
                <div>
                  <Label htmlFor="prompt" className="text-sm font-medium mb-2 block">
                    Describe Your Image
                  </Label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A serene mountain landscape at sunset with golden light, photorealistic, 4K..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 rounded-lg"
                    disabled={generateImageMutation.isPending || !prompt.trim()}
                  >
                    {generateImageMutation.isPending ? (
                      <>
                        <Spinner className="mr-2" />
                        Generating...
                      </>
                    ) : (
                      'Generate Image'
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  💡 Tip: Be specific with your description for better results. Include style, lighting, mood, and any specific details you want.
                </p>
              </form>
            </div>

            {/* Generated Images Gallery */}
            {allImages.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Generated Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allImages.map((image) => (
                    <div
                      key={image.id}
                      className="glass-effect rounded-xl overflow-hidden hover:shadow-lg smooth-transition"
                    >
                      <div className="aspect-square bg-muted overflow-hidden">
                        <img
                          src={image.imageUrl}
                          alt={image.prompt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-foreground mb-3 line-clamp-2">
                          {image.prompt}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 rounded-lg"
                            onClick={() => handleDownloadImage(image.imageUrl, image.prompt)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 rounded-lg"
                            onClick={() => handleCopyPrompt(image.prompt)}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoadingImages && (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading your images...</p>
              </div>
            )}

            {/* Error State */}
            {imageError && (
              <div className="text-center py-12 bg-destructive/10 rounded-lg p-6">
                <p className="text-destructive font-semibold mb-2">Failed to load images</p>
                <p className="text-muted-foreground text-sm">Please try refreshing the page.</p>
              </div>
            )}

            {/* Empty State */}
            {allImages.length === 0 && !generateImageMutation.isPending && !isLoadingImages && !imageError && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">No images yet</h3>
                <p className="text-muted-foreground">
                  Start by entering a prompt above to generate your first AI image!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
