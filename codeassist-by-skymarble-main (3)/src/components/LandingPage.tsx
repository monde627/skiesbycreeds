import { Zap, Code2, Globe, Shield, Terminal, ArrowRight, Github, Twitter, Cpu, Database, Layout } from 'lucide-react'

interface LandingPageProps {
  onLogin: () => void
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">CodeAssist</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
          </div>
          <button 
            onClick={onLogin}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-elegant"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1">
        <section className="pt-32 pb-20 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8 animate-fade-in">
              <SparkleIcon className="w-3 h-3" />
              The Future of Development
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight leading-[1.1] animate-slide-up">
              Build your vision at the <span className="text-primary">speed of thought.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
              The first AI-native coding environment designed for modern teams. Describe, build, and deploy in one seamless workflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <button 
                onClick={onLogin}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-elegant flex items-center justify-center gap-2"
              >
                Get Started for Free <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-secondary border text-secondary-foreground font-bold text-lg hover:bg-muted transition-all flex items-center justify-center gap-2">
                Watch Demo
              </button>
            </div>

            {/* Preview Mockup */}
            <div className="mt-20 relative max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full -z-10" />
              <div className="bg-muted/30 p-2 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
                <div className="bg-background rounded-xl overflow-hidden border border-white/5 aspect-video flex">
                  <div className="w-64 border-r p-4 hidden md:block">
                    <div className="flex gap-2 mb-8">
                      <div className="w-3 h-3 rounded-full bg-destructive/50" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${Math.random() * 50 + 40}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                    <Code2 className="w-16 h-16 text-primary mb-6 animate-pulse" />
                    <h3 className="text-2xl font-display font-bold mb-2">Live Coding Environment</h3>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      Our proprietary agent writes production-ready code while you focus on the architecture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Everything you need</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                CodeAssist streamlines the entire development lifecycle, from initial concept to global scale.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Cpu className="w-6 h-6" />}
                title="AI Agentic Workflow"
                description="Not just completion, but true autonomous task execution in a secure sandbox."
              />
              <FeatureCard 
                icon={<Globe className="w-6 h-6" />}
                title="Global Deployment"
                description="One-click deployment to our global edge network with automatic scaling."
              />
              <FeatureCard 
                icon={<Shield className="w-6 h-6" />}
                title="Enterprise Security"
                description="SOC2 compliant environments with end-to-end encryption for your IP."
              />
              <FeatureCard 
                icon={<Database className="w-6 h-6" />}
                title="Real-time Previews"
                description="See your changes instantly in a fully-interactive production-grade preview."
              />
              <FeatureCard 
                icon={<Layout className="w-6 h-6" />}
                title="Design System First"
                description="Automatically enforced design principles for beautiful applications every time."
              />
              <FeatureCard 
                icon={<Terminal className="w-6 h-6" />}
                title="Full Shell Access"
                description="Complete control over your environment with a full terminal and shell."
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your growth. Scale up as your team expands.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <PricingCard 
                title="Free"
                price="$0"
                description="Perfect for individuals and small side projects."
                features={["1 AI Sandbox", "Standard AI Model", "Public Projects", "Basic Support"]}
                buttonText="Start Coding"
                onAction={onLogin}
              />
              <PricingCard 
                title="Pro"
                price="$29"
                description="Ideal for professional developers and startups."
                features={["Unlimited Sandboxes", "Advanced AI Models", "Private Projects", "Priority Support", "Custom Domains"]}
                highlighted
                buttonText="Get Pro"
                onAction={onLogin}
              />
              <PricingCard 
                title="Enterprise"
                price="Custom"
                description="For large organizations with complex needs."
                features={["SAML SSO", "Custom Security Policies", "Dedicated Infrastructure", "24/7 Premium Support", "On-prem Options"]}
                buttonText="Contact Sales"
                onAction={onLogin}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="text-primary-foreground w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">CodeAssist</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Skymarble Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border bg-background hover:border-primary/50 transition-colors group">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function PricingCard({ title, price, description, features, highlighted, buttonText, onAction }: any) {
  return (
    <div className={cn(
      "p-8 rounded-3xl border flex flex-col transition-all",
      highlighted ? "bg-primary text-primary-foreground shadow-elegant scale-105 border-transparent" : "bg-background border-border"
    )}>
      <h3 className="text-2xl font-display font-bold mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-sm opacity-80">/mo</span>}
      </div>
      <p className={cn("text-sm mb-8 leading-relaxed", highlighted ? "text-primary-foreground/80" : "text-muted-foreground")}>
        {description}
      </p>
      <div className="space-y-4 mb-8 flex-1">
        {features.map((f: string) => (
          <div key={f} className="flex items-center gap-3 text-sm">
            <Shield className={cn("w-4 h-4 shrink-0", highlighted ? "text-primary-foreground" : "text-primary")} />
            {f}
          </div>
        ))}
      </div>
      <button 
        onClick={onAction}
        className={cn(
          "w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]",
          highlighted ? "bg-white text-primary" : "bg-primary text-primary-foreground shadow-elegant hover:bg-primary/90"
        )}
      >
        {buttonText}
      </button>
    </div>
  )
}

function SparkleIcon(props: any) {
  return (
    <svg 
      {...props}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
