
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

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
];

const CarsManagement = () => {
  const [cars, setCars] = useState(carsData);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  
  // Фильтрация автомобилей
  const filteredCars = cars.filter(car => {
    // Фильтр по статусу
    if (filterStatus !== "all" && car.status !== filterStatus) return false;
    
    // Фильтр по категории
    if (filterCategory !== "all" && car.category !== filterCategory) return false;
    
    // Поиск по названию
    if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  // Обработчики для фильтров
  const handleStatusFilterChange = (value: string) => {
    setFilterStatus(value);
  };
  
  const handleCategoryFilterChange = (value: string) => {
    setFilterCategory(value);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Обработчик для добавления/редактирования авто
  const handleSaveCar = (carData: any) => {
    if (selectedCar) {
      // Редактирование существующего авто
      setCars(cars.map(car => 
        car.id === selectedCar.id ? { ...car, ...carData } : car
      ));
    } else {
      // Добавление нового авто
      const newCar = {
        id: cars.length + 1,
        ...carData,
        status: "Доступен",
      };
      setCars([...cars, newCar]);
    }
    
    setIsAddDialogOpen(false);
    setSelectedCar(null);
  };
  
  // Открытие диалога редактирования
  const openEditDialog = (car: any) => {
    setSelectedCar(car);
    setIsAddDialogOpen(true);
  };
  
  // Обработчик для удаления авто
  const handleDeleteCar = (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот автомобиль?")) {
      setCars(cars.filter(car => car.id !== id));
    }
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <Input 
                placeholder="Поиск автомобилей..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full md:w-64"
              />
              
              <div className="flex gap-2 w-full sm:w-auto">
                <Select 
                  value={filterStatus} 
                  onValueChange={handleStatusFilterChange}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="Доступен">Доступен</SelectItem>
                    <SelectItem value="В прокате">В прокате</SelectItem>
                    <SelectItem value="На ТО">На ТО</SelectItem>
                    <SelectItem value="Недоступен">Недоступен</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={filterCategory} 
                  onValueChange={handleCategoryFilterChange}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    <SelectItem value="Эконом">Эконом</SelectItem>
                    <SelectItem value="Бизнес">Бизнес</SelectItem>
                    <SelectItem value="Премиум">Премиум</SelectItem>
                    <SelectItem value="Кроссовер">Кроссовер</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="w-[100px]">Фото</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Год</TableHead>
                  <TableHead>Цена/день</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.length > 0 ? (
                  filteredCars.map((car) => (
                    <TableRow key={car.id}>
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
                    <TableCell colSpan={8} className="text-center h-24 text-gray-500">
                      Автомобили не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
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
