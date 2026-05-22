import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { Link } from 'wouter';

export default function Pricing() {
  const { isAuthenticated } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for trying out AIStudio',
      features: [
        '5 images per month',
        'Basic AI models',
        'Standard resolution (512x512)',
        'Community support',
        'No credit card required',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'For serious creators and professionals',
      features: [
        '100 images per month',
        'Advanced AI models',
        'High resolution (1024x1024)',
        'Priority support',
        'Custom style presets',
        'Batch generation',
        'API access',
      ],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams and large-scale operations',
      features: [
        'Unlimited images',
        'All AI models available',
        'Ultra high resolution (2048x2048)',
        '24/7 dedicated support',
        'Custom integrations',
        'White-label options',
        'SLA guarantee',
        'Team management',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your creative needs. All plans include a 7-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden smooth-transition ${
                  plan.highlighted
                    ? 'ring-2 ring-primary shadow-2xl scale-105 md:scale-100'
                    : 'border border-border'
                } ${plan.highlighted ? 'bg-card' : 'bg-card'}`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-primary to-accent px-4 py-2 text-center">
                    <span className="text-sm font-semibold text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    )}
                  </div>

                  <Button
                    className="w-full rounded-lg mb-8"
                    variant={plan.highlighted ? 'default' : 'outline'}
                    onClick={() => {
                      if (plan.name === 'Enterprise') {
                        window.location.href = '/contact';
                      } else if (!isAuthenticated) {
                        window.location.href = getLoginUrl();
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: 'Can I upgrade or downgrade my plan anytime?',
                  a: 'Yes, you can change your plan at any time. Changes take effect immediately.',
                },
                {
                  q: 'Is there a free trial?',
                  a: 'All paid plans include a 7-day free trial. No credit card required to start.',
                },
                {
                  q: 'What happens to my images if I cancel?',
                  a: 'Your generated images remain yours forever. You can download them anytime.',
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.',
                },
              ].map((faq, index) => (
                <div key={index} className="glass-effect p-6 rounded-lg">
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of creators already using AIStudio.
            </p>
            {isAuthenticated ? (
              <Link href="/generate">
                <Button size="lg" className="rounded-full px-8">
                  Start Creating
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={() => (window.location.href = getLoginUrl())}
                className="rounded-full px-8"
              >
                Get Started Free
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
