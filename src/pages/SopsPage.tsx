import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { sops } from '@/data/sops';
import { ListChecks } from 'lucide-react';
export function SopsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-display font-bold">Standard Operating Procedures</h1>
        <p className="text-lg text-muted-foreground mt-2">
          The foundation of consistency, quality, and safety in our kitchen.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Kitchen SOPs</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {sops.map((category, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-semibold mt-6 mb-4 first:mt-0">{category.title}</h3>
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                      <AccordionTrigger className="text-lg">{item.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                          {item.content.map((line, lineIndex) => (
                            <li key={lineIndex} className="flex items-start">
                              <ListChecks className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}