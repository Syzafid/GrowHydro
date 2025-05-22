
import React from 'react';
import { Separator } from "@/components/ui/separator";

export interface ProductSpec {
  name: string;
  value: string;
}

export interface ProductSpecificationGroup {
  title: string;
  specs: ProductSpec[];
}

interface ProductSpecificationsProps {
  groups: ProductSpecificationGroup[];
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ groups }) => {
  return (
    <div className="space-y-8">
      {groups.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h3 className="text-xl font-semibold mb-4">{group.title}</h3>
          <div className="space-y-1">
            {group.specs.map((spec, specIndex) => (
              <div
                key={specIndex}
                className={`grid grid-cols-1 md:grid-cols-3 py-3 ${specIndex % 2 === 0 ? 'bg-muted/10' : ''}`}
              >
                <div className="font-medium">{spec.name}</div>
                <div className="md:col-span-2">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSpecifications;
