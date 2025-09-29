import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, ClipboardList, Users, CheckSquare } from 'lucide-react';
const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};
const navCards = [
  {
    title: 'Recipe Library',
    description: 'Access all 18 pilot recipes with detailed 14-point specifications.',
    link: '/recipes',
    icon: BookOpen,
    cta: 'Browse Recipes',
  },
  {
    title: 'Standard Operating Procedures',
    description: 'Review kitchen SOPs for consistency and quality control.',
    link: '/sops',
    icon: ClipboardList,
    cta: 'View SOPs',
  },
  {
    title: 'Training Guidelines',
    description: 'Onboarding and certification process for all kitchen staff.',
    link: '/training',
    icon: Users,
    cta: 'See Guidelines',
  },
  {
    title: 'Pilot Sprint Checklist',
    description: 'Track the progress of the 4-week pilot sprint.',
    link: '/checklist',
    icon: CheckSquare,
    cta: 'Open Checklist',
  },
];
export function HomePage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-lg bg-card border"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Welcome to the Culinary Codex
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl">
          Your central hub for transforming culinary art into a scalable science. Ensure consistency, streamline training, and manage quality with stunning visual clarity.
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {navCards.map((card, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="h-full flex flex-col group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl font-semibold">{card.title}</CardTitle>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardDescription className="pt-2">{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                  <Link to={card.link}>
                    {card.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}