import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { Sparkles, Zap, Shield, Infinity } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = ['Create Stunning AI Images', 'Transform Your Vision', 'Unleash Creativity'];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Generation',
      description: 'Create stunning images from simple text descriptions using advanced AI models.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate high-quality images in seconds with our optimized infrastructure.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared. Complete privacy guaranteed.',
    },
    {
      icon: Infinity,
      title: 'Unlimited Potential',
      description: 'Create unlimited variations and explore endless creative possibilities.',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text inline-block min-h-[1.2em] animate-fade-in-out">
                {headlines[headlineIndex]}
              </span>
              <br />
              <span className="text-foreground">in Seconds</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your imagination into reality with our cutting-edge AI image generator. 
              No design skills required. Just describe what you want, and let AI do the magic.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {isAuthenticated ? (
                <Link href="/generate">
                  <Button size="lg" className="rounded-full px-8">
                    Start Creating
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    size="lg"
                    onClick={() => (window.location.href = getLoginUrl())}
                    className="rounded-full px-8"
                  >
                    Get Started Free
                  </Button>
                  <Link href="/pricing">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8"
                    >
                      View Pricing
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-1">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                  <p className="text-muted-foreground">Your generated images will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose AIStudio?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of creative AI with features designed for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass-effect p-8 rounded-xl hover:shadow-lg smooth-transition hover:scale-105 hover:-translate-y-1"
                  style={{
                    animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 smooth-transition">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of creators using AIStudio to bring their ideas to life.
              Start for free, no credit card required.
            </p>
            {isAuthenticated ? (
              <Link href="/generate">
                <Button size="lg" className="rounded-full px-8">
                  Start Generating
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={() => (window.location.href = getLoginUrl())}
                className="rounded-full px-8"
              >
                Sign Up Free
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
