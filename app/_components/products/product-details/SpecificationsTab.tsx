import { Card, CardContent } from "@/components/ui/card";

const SpecificationsTab: React.FC<{ specifications?: Record<string, string> }> = ({ 
  specifications 
}) => {
  const defaultSpecs = specifications || {
    'Material': 'Premium Cotton',
    'Care Instructions': 'Machine wash cold, tumble dry low',
    'Origin': 'Made in USA',
    'Fit': 'Regular Fit',
    'Weight': '200g',
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="divide-y divide-divider">
          {Object.entries(defaultSpecs).map(([key, value]) => (
            <div 
              key={key} 
              className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <span className="font-semibold text-foreground">{key}</span>
              <span className="text-muted-foreground">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecificationsTab