
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// Моковые данные одного автомобиля
const carData = {
  id: 1,
  name: "Toyota Camry",
  category: "Бизнес",
  price: 4500,
  deposit: 15000,
  description: "Toyota Camry - надежный седан бизнес-класса с комфортным салоном и мощным двигателем. Автомобиль оснащен автоматической коробкой передач, климат-контролем, кожаным салоном и современной мультимедийной системой.",
  features: [
    "Кожаный салон",
    "Климат-контроль",
    "Круиз-контроль",
    "Мультимедийная система",
    "Камера заднего вида",
    "Парктроники",
    "Подогрев сидений",
    "Bluetooth"
  ],
  specs: {
    year: 2021,
    engine: "2.5 л / 181 л.с.",
    transmission: "Автомат",
    drive: "Передний",
    fuel: "Бензин",
    consumption: "8.5 л/100 км",
    seats: 5,
    color: "Белый металлик",
    doors: 4
  },
  images: [
    "https://images.unsplash.com/photo-1621007806655-72b0a4e98c1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1550006890-1645728c88c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1605559424244-02632ed3d6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  ]
};

// Функция для форматирования даты
const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  return format(date, "d MMMM yyyy", { locale: ru });
};

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const car = carData; // В реальном приложении здесь было бы получение данных по ID
  
  // Состояние для галереи
  const [activeImage, setActiveImage] = useState(car.images[0]);
  
  // Состояние для формы бронирования
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: ""
  });
  
  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки данных на сервер
    console.log("Form submitted:", { ...formData, startDate, endDate });
    alert("Бронирование отправлено! Мы свяжемся с вами в ближайшее время.");
  };
  
  // Расчет общей стоимости аренды
  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * car.price;
  };
  
  const totalPrice = calculateTotalPrice();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Хлебные крошки */}
          <div className="flex items-center space-x-2 text-sm mb-6">
            <Link to="/" className="text-gray-500 hover:text-primary">Главная</Link>
            <Icon name="ChevronRight" className="h-4 w-4 text-gray-400" />
            <Link to="/catalog" className="text-gray-500 hover:text-primary">Каталог</Link>
            <Icon name="ChevronRight" className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900">{car.name}</span>
          </div>
          
          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
            <div className="flex items-center text-sm text-gray-600">
              <span className="flex items-center">
                <Icon name="Star" className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                4.8
              </span>
              <span className="mx-2">•</span>
              <span>{car.specs.year} год</span>
              <span className="mx-2">•</span>
              <span>{car.specs.transmission}</span>
              <span className="mx-2">•</span>
              <span>От {car.price} ₽/день</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Галерея и информация */}
            <div className="lg:col-span-2">
              {/* Галерея */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="relative aspect-video bg-gray-100">
                  <img 
                    src={activeImage} 
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex space-x-4 overflow-x-auto">
                  {car.images.map((image, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "relative flex-shrink-0 w-24 h-16 rounded overflow-hidden cursor-pointer border-2",
                        activeImage === image ? "border-primary" : "border-transparent"
                      )}
                      onClick={() => setActiveImage(image)}
                    >
                      <img 
                        src={image} 
                        alt={`${car.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Информация о машине в табах */}
              <Tabs defaultValue="description" className="bg-white rounded-lg shadow-sm p-6">
                <TabsList className="mb-6">
                  <TabsTrigger value="description">Описание</TabsTrigger>
                  <TabsTrigger value="specs">Характеристики</TabsTrigger>
                  <TabsTrigger value="features">Комплектация</TabsTrigger>
                  <TabsTrigger value="conditions">Условия аренды</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-4">
                  <p className="text-gray-700">{car.description}</p>
                </TabsContent>
                
                <TabsContent value="specs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Год выпуска</span>
                      <span className="font-medium">{car.specs.year}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Двигатель</span>
                      <span className="font-medium">{car.specs.engine}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Трансмиссия</span>
                      <span className="font-medium">{car.specs.transmission}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Привод</span>
                      <span className="font-medium">{car.specs.drive}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Тип топлива</span>
                      <span className="font-medium">{car.specs.fuel}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Расход топлива</span>
                      <span className="font-medium">{car.specs.consumption}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Количество мест</span>
                      <span className="font-medium">{car.specs.seats}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Цвет</span>
                      <span className="font-medium">{car.specs.color}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Количество дверей</span>
                      <span className="font-medium">{car.specs.doors}</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Icon name="Check" className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="conditions" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded">
                      <h3 className="font-semibold mb-2">Требования к арендатору:</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <Icon name="CircleCheck" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Возраст от 21 года</span>
                        </li>
                        <li className="flex items-start">
                          <Icon name="CircleCheck" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Водительский стаж от 2 лет</span>
                        </li>
                        <li className="flex items-start">
                          <Icon name="CircleCheck" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Паспорт и водительское удостоверение</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <h3 className="font-semibold mb-2">Финансовые условия:</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <Icon name="CircleInfo" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                          <span>Залог: {car.deposit.toLocaleString()} ₽</span>
                        </li>
                        <li className="flex items-start">
                          <Icon name="CircleInfo" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                          <span>Лимит пробега: 250 км/сутки</span>
                        </li>
                        <li className="flex items-start">
                          <Icon name="CircleInfo" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                          <span>Штраф за курение: 5000 ₽</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Форма бронирования */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Забронировать автомобиль</h3>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-6">
                      {/* Выбор дат */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate" className="mb-1 block">Дата начала</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <Icon name="Calendar" className="mr-2 h-4 w-4" />
                                {startDate ? (
                                  formatDate(startDate)
                                ) : (
                                  <span className="text-gray-500">Выберите дату</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                disabled={(date) => 
                                  date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                  (endDate ? date > endDate : false)
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div>
                          <Label htmlFor="endDate" className="mb-1 block">Дата окончания</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <Icon name="Calendar" className="mr-2 h-4 w-4" />
                                {endDate ? (
                                  formatDate(endDate)
                                ) : (
                                  <span className="text-gray-500">Выберите дату</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                                disabled={(date) => 
                                  (startDate ? date < startDate : date < new Date(new Date().setHours(0, 0, 0, 0)))
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      {/* Данные клиента */}
                      <div>
                        <Label htmlFor="name" className="mb-1 block">Ваше имя</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Иван Иванов"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="mb-1 block">Телефон</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+7 (999) 123-45-67"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="mb-1 block">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@mail.ru"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="comment" className="mb-1 block">Комментарий (необязательно)</Label>
                        <Textarea
                          id="comment"
                          name="comment"
                          value={formData.comment}
                          onChange={handleInputChange}
                          placeholder="Дополнительная информация"
                          rows={3}
                        />
                      </div>
                    </div>
                    
                    {/* Итоговая стоимость */}
                    {startDate && endDate && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Стоимость в день:</span>
                          <span>{car.price.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">
                            Количество дней:
                          </span>
                          <span>
                            {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}
                          </span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
                        </div>
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full" size="lg">
                      Забронировать
                    </Button>
                    
                    <div className="text-center text-xs text-gray-500 mt-4">
                      Нажимая кнопку "Забронировать", вы соглашаетесь с условиями аренды и публичной офертой
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CarDetail;
