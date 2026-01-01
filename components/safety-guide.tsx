import { Droplets, Wind, Flame, Mountain, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function SafetyGuide() {
  const guides = [
    {
      id: "flood",
      title: "Flood Safety",
      icon: Droplets,
      color: "text-chart-3",
      sections: [
        {
          title: "Before a Flood",
          items: [
            "Know your area's flood risk and evacuation routes",
            "Prepare an emergency kit with water, food, and supplies",
            "Move valuable items to higher floors",
            "Install check valves in plumbing to prevent backflow",
          ],
        },
        {
          title: "During a Flood",
          items: [
            "Move to higher ground immediately",
            "Never walk or drive through flood waters",
            "Avoid contact with flood water (may be contaminated)",
            "Stay away from downed power lines",
          ],
        },
        {
          title: "After a Flood",
          items: [
            "Return home only when authorities say it's safe",
            "Document damage with photos for insurance",
            "Clean and disinfect everything that got wet",
            "Watch for structural damage before entering buildings",
          ],
        },
      ],
    },
    {
      id: "storm",
      title: "Storm Safety",
      icon: Wind,
      color: "text-accent",
      sections: [
        {
          title: "Before a Storm",
          items: [
            "Secure outdoor objects that could blow away",
            "Close all windows and shutters",
            "Charge electronic devices and have backup power",
            "Stock up on emergency supplies",
          ],
        },
        {
          title: "During a Storm",
          items: [
            "Stay indoors away from windows",
            "Unplug electrical appliances",
            "Avoid using landline phones",
            "Listen to weather updates on battery radio",
          ],
        },
        {
          title: "After a Storm",
          items: [
            "Check for injuries and damage",
            "Avoid downed power lines and damaged areas",
            "Use flashlights, not candles",
            "Report utility damage to authorities",
          ],
        },
      ],
    },
    {
      id: "fire",
      title: "Fire Safety",
      icon: Flame,
      color: "text-primary",
      sections: [
        {
          title: "Fire Prevention",
          items: [
            "Install and maintain smoke detectors",
            "Keep fire extinguishers accessible",
            "Create and practice escape plans",
            "Clear vegetation around your property",
          ],
        },
        {
          title: "During a Fire",
          items: [
            "Call emergency services immediately (193)",
            "Get out fast and stay out",
            "Crawl low under smoke",
            "Never go back inside a burning building",
          ],
        },
        {
          title: "Wildfire Evacuation",
          items: [
            "Follow evacuation orders immediately",
            "Take your emergency kit and important documents",
            "Close all windows and doors",
            "Turn on lights to make home visible in smoke",
          ],
        },
      ],
    },
    {
      id: "landslide",
      title: "Landslide Safety",
      icon: Mountain,
      color: "text-chart-2",
      sections: [
        {
          title: "Warning Signs",
          items: [
            "Cracks in walls, floors, or foundations",
            "Tilting trees, poles, or fences",
            "Sudden increase or decrease in water flow",
            "Unusual sounds (trees cracking, boulders knocking)",
          ],
        },
        {
          title: "During a Landslide",
          items: [
            "Move away from the path of the landslide",
            "Run to the nearest high ground perpendicular to the flow",
            "Protect your head with your arms",
            "Stay alert and awake during storms",
          ],
        },
        {
          title: "After a Landslide",
          items: [
            "Stay away from the slide area",
            "Watch for flooding which may occur after",
            "Check for injured or trapped persons",
            "Report broken utility lines",
          ],
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Emergency Kit Checklist */}
      <Card className="bg-primary/10 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CheckCircle className="w-5 h-5 text-primary" />
            Emergency Kit Essentials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-foreground">Water (3-day supply)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-foreground">Non-perishable food</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-foreground">First aid kit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-foreground">Flashlight & batteries</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-foreground">Battery radio</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-foreground">Important documents</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-foreground">Medications</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-foreground">Cash</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Guides */}
      {guides.map((guide) => {
        const Icon = guide.icon
        return (
          <Card key={guide.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${guide.color}`} />
                <span className="text-foreground">{guide.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {guide.sections.map((section, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-foreground">{section.title}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
