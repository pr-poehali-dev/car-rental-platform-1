
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/ui/pagination";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Моковые данные для автопарка
const carsData = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Бизнес",
    year: 2021,
    transmission: "Автомат",
    fuel: "Бензин",
    price: 4500,
    status: "Доступен",
    image: "https://images.unsplash.com/photo-1621007806655-72b0a4e98c1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Volkswagen Polo",
    category: "Эконом",
    year: 2020,
    transmission: "Механика",
    fuel: "Бензин",
    price: 2500,
    status: "В прокате",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "BMW X5",
    category: "Премиум",
    year: 2022,
    transmission: "Автомат",
    fuel: "Дизель",
    price: 8000,
    status: "Доступен",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  // Добавим больше данных для демонстрации пагинации
  {
    id: 4,
    name: "Kia Rio",
    category: "Эконом",
    year: 2019,
    transmission: "Механика",
    fuel: "Бензин",
    price: 2000,
    status: "В прокате",
    image: "https://images.unsplash.com/photo-1543854589-fdd815f176e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Mercedes-Benz E-Class",
    category: "Бизнес",
    year: 2022,
    transmission: "Автомат",
    fuel: "Бензин",
    price: 6500,
    status: "На ТО",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Hyundai Solaris",
    category: "Эконом",
    year: 2020,
    transmission: "Механика",
    fuel: "Бензин",
    price: 2200,
    status: "Доступен",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Audi A6",
    category: "Премиум",
    year: 2021,
    transmission: "Автомат",
    fuel: "Бензин",
    price: 7500,
    status: "Доступен",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Renault Logan",
    category: "Эконом",
    year: 2018,
    transmission: "Механика",
    fuel: "Бензин",
    price: 1800,
    status: "Недоступен",
    image: "https://images.unsplash.com/photo-1590510696702-991de9fd889c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

type Car = {
  id: number;
  name: string;
  category: string;
  year: number;
  transmission: string;
  fuel: string;
  price: number;
  status: string;
  image: string;
};

type Filters = {
  status: string;
  category: string;
  fuel: string;
  transmission: string;
  priceRange: [number, number];
  yearRange: [number, number];
};

// Дополнительные данные для фильтрации
const fuels = ["Бензин", "Дизель", "Гибрид", "Электро"];
const transmissions = ["Автомат", "Механика", "Робот", "Вариатор"];
const categories = ["Эконом", "Бизнес", "Премиум", "Кроссовер"];
const statuses = ["Доступен", "В прокате", "На ТО", "Недоступен"];

const CarsManagement = () => {
  const [cars, setCars] = useState<Car[]>(carsData);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  
  // Состояние для модальных окон
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bulkActionStatus, setBulkActionStatus] = useState("");
  
  // Состояние для фильтров
  const [searchQuery, setSearchQuery] = useState("");
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: "all",
    category: "all",
    fuel: "all",
    transmission: "all",
    priceRange: [0, 10000],
    yearRange: [2010, 2025],
  });
  
  // Состояние для сортировки
  const [sortField, setSortField] = useState<keyof Car | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Состояние для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Применение фильтров и сортировки
  const applyFilters = (data: Car[]) => {
    return data.filter(car => {
      // Базовые фильтры
      if (filters.status !== "all" && car.status !== filters.status) return false;
      if (filters.category !== "all" && car.category !== filters.category) return false;
      if (filters.fuel !== "all" && car.fuel !== filters.fuel) return false;
      if (filters.transmission !== "all" && car.transmission !== filters.transmission) return false;
      
      // Ценовой диапазон
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false;
      
      // Диапазон годов
      if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) return false;
      
      // Поиск по названию
      if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    });
  };
  
  const applySorting = (data: Car[]) => {
    if (!sortField) return data;
    
    return [...data].sort((a, b) => {
      if (sortField === "price" || sortField === "year") {
        return sortDirection === "asc" 
          ? a[sortField] - b[sortField] 
          : b[sortField] - a[sortField];
      }
      
      const aValue = String(a[sortField]);
      const bValue = String(b[sortField]);
      
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };
  
  // Применение пагинации
  const paginateData = (data: Car[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };
  
  // Итоговые отфильтрованные и отсортированные данные
  const filteredCars = applyFilters(cars);
  const sortedCars = applySorting(filteredCars);
  const paginatedCars = paginateData(sortedCars);
  const totalPages = Math.ceil(sortedCars.length / itemsPerPage);
  
  // Обработчики для фильтров
  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  
  const resetFilters = () => {
    setFilters({
      status: "all",
      category: "all",
      fuel: "all",
      transmission: "all",
      priceRange: [0, 10000],
      yearRange: [2010, 2025],
    });
    setSearchQuery("");
    setCurrentPage(1);
  };
  
  // Обработчики для сортировки
  const handleSort = (field: keyof Car) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  // Обработчики для пагинации
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };
  
  // Обработчики для массовых действий
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedCars([]);
    } else {
      setSelectedCars(paginatedCars.map(car => car.id));
    }
    setIsAllSelected(!isAllSelected);
  };
  
  const handleSelectCar = (id: number) => {
    if (selectedCars.includes(id)) {
      setSelectedCars(prev => prev.filter(carId => carId !== id));
    } else {
      setSelectedCars(prev => [...prev, id]);
    }
  };
  
  useEffect(() => {
    // Проверяем, выбраны ли все элементы на текущей странице
    const allSelected = paginatedCars.length > 0 && paginatedCars.every(car => selectedCars.includes(car.id));
    setIsAllSelected(allSelected);
  }, [selectedCars, paginatedCars]);
  
  // Массовое изменение статуса
  const handleBulkStatusChange = () => {
    setCars(cars.map(car => 
      selectedCars.includes(car.id) ? { ...car, status: bulkActionStatus } : car
    ));
    setSelectedCars([]);
    setIsStatusDialogOpen(false);
  };
  
  // Массовое удаление
  const handleBulkDelete = () => {
    setCars(cars.filter(car => !selectedCars.includes(car.id)));
    setSelectedCars([]);
    setIsDeleteDialogOpen(false);
  };
  
  // Обработчики для отдельного автомобиля
  const handleSaveCar = (carData: Omit<Car, "id">) => {
    if (selectedCar) {
      // Редактирование существующего авто
      setCars(cars.map(car => 
        car.id === selectedCar.id ? { ...car, ...carData } : car
      ));
    } else {
      // Добавление нового авто
      const newCar = {
        id: Math.max(...cars.map(c => c.id)) + 1,
        ...carData as Car,
      };
      setCars([...cars, newCar]);
    }
    setIsAddDialogOpen(false);
    setSelectedCar(null);
  };
  
  const openEditDialog = (car: Car) => {
    setSelectedCar(car);
    setIsAddDialogOpen(true);
  };
  
  const handleDeleteCar = (id: number) => {
    setCars(cars.filter(car => car.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Управление автопарком</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Icon name="Plus" className="mr-2 h-4 w-4" />
              Добавить автомобиль
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedCar ? "Редактировать автомобиль" : "Добавить новый автомобиль"}
              </DialogTitle>
              <DialogDescription>
                Заполните информацию об автомобиле для добавления в каталог.
              </DialogDescription>
            </DialogHeader>
            
            <CarFormDialog 
              car={selectedCar} 
              onSave={handleSaveCar} 
              onCancel={() => {
                setIsAddDialogOpen(false);
                setSelectedCar(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col space-y-4">
            {/* Поиск и базовые фильтры */}
            <div className="flex flex-wrap gap-4 items-start lg:items-center">
              <Input 
                placeholder="Поиск автомобилей..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full sm:w-64"
              />
              
              <div className="flex flex-wrap gap-2 flex-1">
                <Select 
                  value={filters.status} 
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => handleFilterChange("category", value)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setAdvancedFiltersOpen(!advancedFiltersOpen)}
                  className="ml-auto"
                >
                  <Icon name="SlidersHorizontal" className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Расширенные фильтры */}
            {advancedFiltersOpen && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t">
                <div>
                  <Label className="mb-1 block text-sm">Тип топлива</Label>
                  <Select 
                    value={filters.fuel} 
                    onValueChange={(value) => handleFilterChange("fuel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Все типы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      {fuels.map(fuel => (
                        <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-1 block text-sm">Трансмиссия</Label>
                  <Select 
                    value={filters.transmission} 
                    onValueChange={(value) => handleFilterChange("transmission", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Все типы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      {transmissions.map(transmission => (
                        <SelectItem key={transmission} value={transmission}>{transmission}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-1 block text-sm">Ценовой диапазон (₽)</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="number" 
                      value={filters.priceRange[0]}
                      onChange={(e) => handleFilterChange("priceRange", [
                        Number(e.target.value), filters.priceRange[1]
                      ])}
                      className="w-full"
                      placeholder="От"
                    />
                    <span>-</span>
                    <Input 
                      type="number" 
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange("priceRange", [
                        filters.priceRange[0], Number(e.target.value)
                      ])}
                      className="w-full"
                      placeholder="До"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-1 block text-sm">Год выпуска</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="number" 
                      value={filters.yearRange[0]}
                      onChange={(e) => handleFilterChange("yearRange", [
                        Number(e.target.value), filters.yearRange[1]
                      ])}
                      className="w-full"
                      placeholder="От"
                    />
                    <span>-</span>
                    <Input 
                      type="number" 
                      value={filters.yearRange[1]}
                      onChange={(e) => handleFilterChange("yearRange", [
                        filters.yearRange[0], Number(e.target.value)
                      ])}
                      className="w-full"
                      placeholder="До"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={resetFilters}
                    className="flex items-center"
                  >
                    <Icon name="RotateCcw" className="mr-2 h-3.5 w-3.5" />
                    Сбросить фильтры
                  </Button>
                </div>
              </div>
            )}
            
            {/* Массовые действия */}
            {selectedCars.length > 0 && (
              <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
                <span className="text-sm text-muted-foreground">
                  Выбрано: {selectedCars.length}
                </span>
                
                <div className="ml-auto flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsStatusDialogOpen(true)}
                    className="flex items-center"
                  >
                    <Icon name="Tag" className="mr-2 h-3.5 w-3.5" />
                    Изменить статус
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="flex items-center"
                  >
                    <Icon name="Trash2" className="mr-2 h-3.5 w-3.5" />
                    Удалить
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={isAllSelected} 
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead 
                    className="w-[60px] cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center">
                      ID
                      {sortField === "id" && (
                        <Icon 
                          name={sortDirection === "asc" ? "ArrowUp" : "ArrowDown"} 
                          className="ml-1 h-3 w-3"
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">Фото</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Название
                      {sortField === "name" && (
                        <Icon 
                          name={sortDirection === "asc" ? "ArrowUp" : "ArrowDown"} 
                          className="ml-1 h-3 w-3"
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center">
                      Категория
                      {sortField === "category" && (
                        <Icon 
                          name={sortDirection === "asc" ? "ArrowUp" : "ArrowDown"} 
                          className="ml-1 h-3 w-3"
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("year")}
                  >
                    <div className="flex items-center">
                      Год
                      {sortField === "year" && (
                        <Icon 
                          name={sortDirection === "asc" ? "ArrowUp" : "ArrowDown"} 
                          className="ml-1 h-3 w-3"
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center">
                      Цена/день
                      {sortField === "price" && (
                        <Icon 
                          name={sortDirection === "asc" ? "ArrowUp" : "ArrowDown"} 
                          className="ml-1 h-3 w-3"
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      Статус
                      {sortField === "status" && (
                        <Icon 
                          name={sortDirection === "asc" ? "ArrowUp" : "ArrowDown"} 
                          className="ml-1 h-3 w-3"
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCars.length > 0 ? (
                  paginatedCars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedCars.includes(car.id)} 
                          onCheckedChange={() => handleSelectCar(car.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{car.id}</TableCell>
                      <TableCell>
                        <div className="h-14 w-20 bg-gray-100 rounded">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="h-full w-full object-cover rounded"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{car.name}</TableCell>
                      <TableCell>{car.category}</TableCell>
                      <TableCell>{car.year}</TableCell>
                      <TableCell>{car.price.toLocaleString()} ₽</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            car.status === "Доступен" 
                              ? "success" 
                              : car.status === "В прокате" 
                                ? "default" 
                                : car.status === "На ТО"
                                  ? "warning"
                                  : "secondary"
                          }
                        >
                          {car.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openEditDialog(car)}
                          >
                            <Icon name="Edit" className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteCar(car.id)}
                          >
                            <Icon name="Trash2" className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center h-24 text-gray-500">
                      Автомобили не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Пагинация */}
          {sortedCars.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Показано {paginatedCars.length} из {sortedCars.length}</span>
                <Select
                  value={String(itemsPerPage)}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span>на странице</span>
              </div>
              
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Диалог массового изменения статуса */}
      <AlertDialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Изменить статус</AlertDialogTitle>
            <AlertDialogDescription>
              Вы собираетесь изменить статус для {selectedCars.length} выбранных автомобилей.
              Выберите новый статус.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            <Select
              value={bulkActionStatus}
              onValueChange={setBulkActionStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите статус" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkStatusChange} disabled={!bulkActionStatus}>
              Применить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Диалог массового удаления */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтвердите удаление</AlertDialogTitle>
            <AlertDialogDescription>
              Вы собираетесь удалить {selectedCars.length} автомобилей. 
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive text-destructive-foreground">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Компонент формы добавления/редактирования автомобиля
const CarFormDialog = ({ car, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState({
    name: car?.name || "",
    category: car?.category || "Эконом",
    year: car?.year || new Date().getFullYear(),
    transmission: car?.transmission || "Автомат",
    fuel: car?.fuel || "Бензин",
    price: car?.price || 2000,
    status: car?.status || "Доступен",
    image: car?.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="mt-4">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Основная информация</TabsTrigger>
          <TabsTrigger value="specs">Характеристики</TabsTrigger>
          <TabsTrigger value="pricing">Цены и доступность</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Название автомобиля</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Эконом">Эконом</SelectItem>
                  <SelectItem value="Бизнес">Бизнес</SelectItem>
                  <SelectItem value="Премиум">Премиум</SelectItem>
                  <SelectItem value="Кроссовер">Кроссовер</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="year">Год выпуска</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="image">URL изображения</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Предпросмотр изображения</Label>
            <div className="border rounded-md p-2 h-[200px] bg-gray-50">
              <img
                src={formData.image}
                alt="Предпросмотр"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Ошибка+загрузки+изображения";
                }}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="specs" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="transmission">Трансмиссия</Label>
              <Select
                value={formData.transmission}
                onValueChange={(value) => handleSelectChange("transmission", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите трансмиссию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Автомат">Автомат</SelectItem>
                  <SelectItem value="Механика">Механика</SelectItem>
                  <SelectItem value="Робот">Робот</SelectItem>
                  <SelectItem value="Вариатор">Вариатор</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="fuel">Тип топлива</Label>
              <Select
                value={formData.fuel}
                onValueChange={(value) => handleSelectChange("fuel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип топлива" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Бензин">Бензин</SelectItem>
                  <SelectItem value="Дизель">Дизель</SelectItem>
                  <SelectItem value="Гибрид">Гибрид</SelectItem>
                  <SelectItem value="Электро">Электрический</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Особенности</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="feat-ac" />
                  <Label htmlFor="feat-ac">Кондиционер</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feat-audio" />
                  <Label htmlFor="feat-audio">Аудиосистема</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feat-nav" />
                  <Label htmlFor="feat-nav">Навигация</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feat-bluetooth" />
                  <Label htmlFor="feat-bluetooth">Bluetooth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feat-camera" />
                  <Label htmlFor="feat-camera">Камера заднего вида</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="feat-sensors" />
                  <Label htmlFor="feat-sensors">Парктроники</Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="pricing" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="price">Стоимость в день (₽)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="status">Статус</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Доступен">Доступен</SelectItem>
                  <SelectItem value="В прокате">В прокате</SelectItem>
                  <SelectItem value="На ТО">На ТО</SelectItem>
                  <SelectItem value="Недоступен">Недоступен</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="deposit">Залоговая стоимость (₽)</Label>
              <Input
                id="deposit"
                name="deposit"
                type="number"
                defaultValue={formData.price * 3}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-6" />
      
      <DialogFooter>
        <Button variant="outline" onClick={onCancel} type="button">
          Отмена
        </Button>
        <Button type="submit">
          {car ? "Сохранить изменения" : "Добавить автомобиль"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CarsManagement;
