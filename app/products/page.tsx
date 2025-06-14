"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilters, setActiveFilters] = useState({
    categories: categoryParam ? [categoryParam] : [],
    colors: [],
    materials: [],
    sizes: [],
    priceRange: { min: 0, max: 100 },
  });

  // Extract unique filter options
  const allColors = [...new Set(products.flatMap(p => p.colors.map(c => c.name)))];
  const allMaterials = [...new Set(products.flatMap(p => p.materials))];
  const allSizes = [...new Set(products.flatMap(p => p.sizes))];
  
  useEffect(() => {
    applyFilters();
  }, [activeFilters, categoryParam, searchParam]);
  
  useEffect(() => {
    if (categoryParam) {
      setActiveFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [categoryParam]);
  
  const applyFilters = () => {
    let result = [...products];
    
    // Filter by category
    if (activeFilters.categories.length > 0) {
      const categoryIds = categories
        .filter(c => activeFilters.categories.includes(c.slug))
        .map(c => c.id);
      
      result = result.filter(p => 
        categoryIds.length === 0 || categoryIds.includes(p.category)
      );
    }
    
    // Filter by color
    if (activeFilters.colors.length > 0) {
      result = result.filter(p => 
        p.colors.some(c => activeFilters.colors.includes(c.name))
      );
    }
    
    // Filter by material
    if (activeFilters.materials.length > 0) {
      result = result.filter(p => 
        p.materials.some(m => activeFilters.materials.includes(m))
      );
    }
    
    // Filter by size
    if (activeFilters.sizes.length > 0) {
      result = result.filter(p => 
        p.sizes.some(s => activeFilters.sizes.includes(s))
      );
    }
    
    // Filter by price
    result = result.filter(p => 
      p.price >= activeFilters.priceRange.min && 
      p.price <= activeFilters.priceRange.max
    );
    
    // Filter by search
    if (searchParam) {
      const search = searchParam.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search) ||
        p.categoryName.toLowerCase().includes(search)
      );
    }
    
    setFilteredProducts(result);
  };
  
  const handleFilterChange = (filterType: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      colors: [],
      materials: [],
      sizes: [],
      priceRange: { min: 0, max: 100 },
    });
  };
  
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {categoryParam 
              ? `${categories.find(c => c.slug === categoryParam)?.name || 'Products'}`
              : searchParam
                ? `Search Results for "${searchParam}"`
                : "All Products"
            }
          </h1>
          <p className="mt-2 text-muted-foreground">
            Showing {filteredProducts.length} results
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="md:hidden"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          
          <div className="flex items-center gap-2">
            {(activeFilters.categories.length > 0 || 
              activeFilters.colors.length > 0 || 
              activeFilters.materials.length > 0 ||
              activeFilters.sizes.length > 0) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="h-8 text-xs"
              >
                Clear All
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Mobile Filters Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="fixed inset-0 z-50 bg-background p-6 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="overflow-y-auto h-[calc(100vh-120px)]">
                <ProductFilters 
                  categories={categories}
                  colors={allColors}
                  materials={allMaterials}
                  sizes={allSizes}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
              
              <div className="mt-4 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
                <Button onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Desktop Filters */}
        <div className="hidden md:block">
          <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              {(activeFilters.categories.length > 0 || 
                activeFilters.colors.length > 0 || 
                activeFilters.materials.length > 0 ||
                activeFilters.sizes.length > 0) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-8 text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>
            <Separator className="mb-4" />
            <ProductFilters 
              categories={categories}
              colors={allColors}
              materials={allMaterials}
              sizes={allSizes}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <SlidersHorizontal className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold">No products found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters or search criteria
              </p>
              <Button onClick={clearAllFilters} className="mt-4">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}