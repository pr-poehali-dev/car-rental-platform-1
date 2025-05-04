
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Моковые данные для большого каталога
const allCarsData = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Бизнес",
    image: "https://images.unsplash.com/photo-1621007806655-72b0a4e98c1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 4500,
    seats: 5,
    transmission: "Автомат",
    fuel: "Бензин",
    year: 2021
  },
  {
    id: 2,
    name: "Volkswagen Polo",
    category: "Эконом",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 2500,
    seats: 5,
    transmission: "Механика",
    fuel: "Бензин",
    year: 2020
  },
  {
    id: 3,
    name: "BMW X5",
    category: "Премиум",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 8000,
    seats: 5,
    transmission: "Автомат",
    fuel: "Дизель",
    year: 2022
  },
  {
    id: 4,
    name: "Kia Rio",
    category: "Эконом",
    image: "https://images.unsplash.com/photo-1543854589-fdd815f176e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 2000,
    seats: 5,
    transmission: "Механика",
    fuel: "Бензин",
    year: 2019
  },
  {
    id: 5,
    name: "Mercedes-Benz E-Class",
    category: "Бизнес",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 6500,
    seats: 5,
    transmission: "Автомат",
    fuel: "Бензин",
    year: 2022
  },
  {
    id: 6,
    name: "Hyundai Creta",
    category: "Кроссовер",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 3500,
    seats: 5,
    transmission: "Автомат",
    fuel: "Бензин",
    year: 2021
  },
  {
    id: 7,
    name: "Skoda Octavia",
    category: "Бизнес",
    image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 4000,
    seats: 5,
    transmission: "Автомат",
    fuel: "Бензин",
    year: 2020
  },
  {
    id: 8,
    name: "Audi A6",
    category: "Премиум",
    image: "https://images.unsplash.com/photo-1571987502227-9231b837d92a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 7000,
    seats: 5,
    transmission: "Автомат",
    fuel: "Дизель",
    year: 2021
  },
  {
    id: 9,
    name: "Renault Logan",
    category: "Эконом",
    image: "https://images.unsplash.com/photo-1583267374114-c8f14df98130?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 1800,
    seats: 5,
    transmission: "Механика",
    fuel: "Бензин",
    year: 2019
  }
];

const Catalog = () => {
  // Состояние фильтров
  const [priceRange, setPriceRange] = useState<[number, number]>([1500, 8000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("default");
  
  // Состояние пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;
  
  // Получить уникальные категории из данных
  const categories = [...new Set(allCarsData.map(car => car.category))];
  const transmissions = [...new Set(allCarsData.map(car => car.transmission))];
  const fuels = [...new Set(allCarsData.map(car => car.fuel))];
  
  // Функция для фильтрации автомобилей
  const getFilteredCars = () => {
    let filteredCars = [...allCarsData];
    
    // Фильтр по цене
    filteredCars = filteredCars.filter(car => 
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );
    
    // Фильтр по категориям
    if (selectedCategories.length > 0) {
      filteredCars = filteredCars.filter(car => 
        selectedCategories.includes(car.category)
      );
    }
    
    // Фильтр по трансмиссии
    if (selectedTransmissions.length > 0) {
      filteredCars = filteredCars.filter(car => 
        selectedTransmissions.includes(car.transmission)
      );
    }
    
    // Фильтр по типу топлива
    if (selectedFuels.length > 0) {
      filteredCars = filteredCars.filter(car => 
        selectedFuels.includes(car.fuel)
      );
    }
    
    // Сортировка
    if (sortOption === "price-asc") {
      filteredCars.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filteredCars.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name") {
      filteredCars.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "year-desc") {
      filteredCars.sort((a, b) => b.year - a.year);
    }
    
    return filteredCars;
  };
  
  const filteredCars = getFilteredCars();
  
  // Логика пагинации
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  
  // Функция для обработки чекбокса категории
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Сброс на первую страницу при изменении фильтра
  };
  
  // Функция для обработки чекбокса трансмиссии
  const handleTransmissionChange = (transmission: string) => {
    setSelectedTransmissions(prev => 
      prev.includes(transmission)
        ? prev.filter(t => t !== transmission)
        : [...prev, transmission]
    );
    setCurrentPage(1);
  };
  
  // Функция для обработки чекбокса топлива
  const handleFuelChange = (fuel: string) => {
    setSelectedFuels(prev => 
      prev.includes(fuel)
        ? prev.filter(f => f !== fuel)
        : [...prev, fuel]
    );
    setCurrentPage(1);
  };
  
  // Сброс всех фильтров
  const resetFilters = () => {
    setPriceRange([1500, 8000]);
    setSelectedCategories([]);
    setSelectedTransmissions([]);
    setSelectedFuels([]);
    setSortOption("default");
    setCurrentPage(1);
  };
  
  // Генерация элементов пагинации
  const renderPaginationItems = () => {
    const items = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i}
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) || 
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        items.push(
          <PaginationItem key={i}>
            <span className="flex h-10 w-10 items-center justify-center text-sm">...</span>
          </PaginationItem>
        );
      }
    }
    
    return items;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Каталог автомобилей</h1>
          <p className="text-gray-600 mb-6">
            Выберите автомобиль для аренды из нашего автопарка
          </p>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Фильтры */}
            <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Фильтры</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-gray-500 text-sm"
                >
                  Сбросить
                </Button>
              </div>
              
              {/* Фильтр по цене */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Цена за день</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[1500, 8000]}
                    min={1500}
                    max={8000}
                    step={100}
                    value={priceRange}
                    onValueChange={(value) => {
                      setPriceRange(value as [number, number]);
                      setCurrentPage(1);
                    }}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString()} ₽</span>
                    <span>{priceRange[1].toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              {/* Фильтр по категории */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Категория</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox 
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label 
                        htmlFor={`category-${category}`}
                        className="ml-2 cursor-pointer text-sm"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              {/* Фильтр по трансмиссии */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Трансмиссия</h3>
                <div className="space-y-2">
                  {transmissions.map(transmission => (
                    <div key={transmission} className="flex items-center">
                      <Checkbox 
                        id={`transmission-${transmission}`}
                        checked={selectedTransmissions.includes(transmission)}
                        onCheckedChange={() => handleTransmissionChange(transmission)}
                      />
                      <Label 
                        htmlFor={`transmission-${transmission}`}
                        className="ml-2 cursor-pointer text-sm"
                      >
                        {transmission}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              {/* Фильтр по типу топлива */}
              <div>
                <h3 className="font-medium mb-3">Тип топлива</h3>
                <div className="space-y-2">
                  {fuels.map(fuel => (
                    <div key={fuel} className="flex items-center">
                      <Checkbox 
                        id={`fuel-${fuel}`}
                        checked={selectedFuels.includes(fuel)}
                        onCheckedChange={() => handleFuelChange(fuel)}
                      />
                      <Label 
                        htmlFor={`fuel-${fuel}`}
                        className="ml-2 cursor-pointer text-sm"
                      >
                        {fuel}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Список автомобилей */}
            <div className="w-full lg:w-3/4">
              {/* Верхняя панель с сортировкой и результатами */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600">
                  Найдено: <span className="font-semibold">{filteredCars.length}</span> автомобилей
                </p>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Сортировать:</span>
                  <Select
                    value={sortOption}
                    onValueChange={value => {
                      setSortOption(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="По умолчанию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">По умолчанию</SelectItem>
                      <SelectItem value="price-asc">По цене (возр.)</SelectItem>
                      <SelectItem value="price-desc">По цене (убыв.)</SelectItem>
                      <SelectItem value="name">По названию</SelectItem>
                      <SelectItem value="year-desc">По году (новее)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Сетка автомобилей */}
              {currentCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentCars.map(car => (
                    <CarCard key={car.id} {...car} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                  <Icon name="Search" className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Автомобили не найдены</h3>
                  <p className="text-gray-600 mb-4">
                    К сожалению, не найдено автомобилей, соответствующих выбранным критериям.
                  </p>
                  <Button onClick={resetFilters}>Сбросить фильтры</Button>
                </div>
              )}
              
              {/* Пагинация */}
              {filteredCars.length > carsPerPage && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        isActive={currentPage !== 1}
                      />
                    </PaginationItem>
                    
                    {renderPaginationItems()}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        isActive={currentPage !== totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Catalog;
