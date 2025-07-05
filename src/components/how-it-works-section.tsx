import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Search, Tag, Folder } from "lucide-react";

const steps = [
  {
    icon: Save,
    step: "01",
    title: "Save Your Snippets",
    description:
      "Add your code snippets to CodeCrate with a clean, simple interface designed for developers.",
  },
  {
    icon: Tag,
    step: "02",
    title: "Tag & Organize",
    description:
      "Use tags to organize your snippets across projects. Create your personal system.",
  },
  {
    icon: Search,
    step: "03",
    title: "Search & Find",
    description:
      "Use fast search to find any snippet instantly. No more digging through scattered files.",
  },
  {
    icon: Folder,
    step: "04",
    title: "Instant Recall",
    description:
      "Access your organized code snippets with instant recall whenever you need them.",
  },
];

export function HowItWorksSection() {
  return (
    <section className='py-32 relative'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent' />

      <div className='container mx-auto px-6 relative'>
        <div className='mx-auto max-w-3xl text-center mb-20'>
          <Badge
            variant='secondary'
            className='mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 px-4 py-2 backdrop-blur-sm'>
            <Folder className='mr-2 h-4 w-4' />
            How It Works
          </Badge>
          <h2 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent'>
            Simple & Elegant
          </h2>
          <p className='text-xl text-gray-400 leading-relaxed'>
            CodeCrate works the way you think. Save, organize, search, and
            recall your code snippets effortlessly.
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto'>
          {steps.map((step, index) => (
            <Card
              key={index}
              className='group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/20 transition-all duration-500'>
              <CardContent className='p-8 relative text-center'>
                <div className='flex items-center justify-center mb-6'>
                  <div className='relative'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50' />
                    <div className='relative p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500'>
                      <step.icon className='h-8 w-8 text-white' />
                    </div>
                  </div>
                </div>

                <div className='mb-4'>
                  <span className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                    {step.step}
                  </span>
                </div>

                <h3 className='text-xl font-bold text-white mb-4'>
                  {step.title}
                </h3>

                <p className='text-gray-400 leading-relaxed'>
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
