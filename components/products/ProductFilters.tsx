"use client";

import { Category } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductFiltersProps {
  categories: Category[];
  colors: string[];
  materials: string[];
  sizes: string[];
  activeFilters: {
    categories: string[];
    colors: string[];
    materials: string[];
    sizes: string[];
    priceRange: { min: number; max: number };
  };
  onFilterChange: (filterType: string, value: any) => void;
}

export function ProductFilters({
  categories,
  colors,
  materials,
  sizes,
  activeFilters,
  onFilterChange,
}: ProductFiltersProps) {
  const handleCategoryChange = (slug: string) => {
    const newCategories = activeFilters.categories.includes(slug)
      ? activeFilters.categories.filter((c) => c !== slug)
      : [...activeFilters.categories, slug];
    
    onFilterChange("categories", newCategories);
  };
  
  const handleColorChange = (color: string) => {
    const newColors = activeFilters.colors.includes(color)
      ? activeFilters.colors.filter((c) => c !== color)
      : [...activeFilters.colors, color];
    
    onFilterChange("colors", newColors);
  };
  
  const handleMaterialChange = (material: string) => {
    const newMaterials = activeFilters.materials.includes(material)
      ? activeFilters.materials.filter((m) => m !== material)
      : [...activeFilters.materials, material];
    
    onFilterChange("materials", newMaterials);
  };
  
  const handleSizeChange = (size: string) => {
    const newSizes = activeFilters.sizes.includes(size)
      ? activeFilters.sizes.filter((s) => s !== size)
      : [...activeFilters.sizes, size];
    
    onFilterChange("sizes", newSizes);
  };
  
  const handlePriceChange = (value: number[]) => {
    onFilterChange("priceRange", { min: value[0], max: value[1] });
  };
  
  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["categories", "price", "colors", "materials"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.slug}`}
                    checked={activeFilters.categories.includes(category.slug)}
                    onCheckedChange={() => handleCategoryChange(category.slug)}
                  />
                  <Label
                    htmlFor={`category-${category.slug}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[activeFilters.priceRange.min, activeFilters.priceRange.max]}
                max={100}
                step={1}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  ${activeFilters.priceRange.min.toFixed(2)}
                </span>
                <span className="text-sm font-medium">
                  ${activeFilters.priceRange.max.toFixed(2)}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={activeFilters.colors.includes(color)}
                    onCheckedChange={() => handleColorChange(color)}
                  />
                  <Label
                    htmlFor={`color-${color}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="materials">
          <AccordionTrigger>Materials</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={`material-${material}`}
                    checked={activeFilters.materials.includes(material)}
                    onCheckedChange={() => handleMaterialChange(material)}
                  />
                  <Label
                    htmlFor={`material-${material}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {material}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="sizes">
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={activeFilters.sizes.includes(size)}
                    onCheckedChange={() => handleSizeChange(size)}
                  />
                  <Label
                    htmlFor={`size-${size}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}