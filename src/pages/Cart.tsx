
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

// Моковые данные для корзины
const initialCartItems = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Бизнес",
    image: "https://images.unsplash.com/photo-1621007806655-72b0a4e98c1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 4500,
    days: 3,
    startDate: "10 мая 2025",
    endDate: "13 мая 2025"
  },
  {
    id: 3,
    name: "BMW X5",
    category: "Премиум",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 8000,
    days: 2,
    startDate: "15 мая 2025",
    endDate: "17 мая 2025"
  }
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    comment: ""
  });
  
  // Вычисление общей стоимости
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.days, 0);
  const discount = subtotal * (promoDiscount / 100);
  const deposit = 10000; // Фиксированный залог
  const total = subtotal - discount + deposit;
  
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const handleUpdateDays = (id: number, days: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, days } : item
    ));
  };
  
  const handlePromoApply = () => {
    // Имитация проверки промокода
    if (promoCode === "PROMO10") {
      setPromoDiscount(10);
    } else if (promoCode === "PROMO20") {
      setPromoDiscount(20);
    } else {
      setPromoDiscount(0);
      alert("Недействительный промокод");
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь будет отправка данных на сервер
    console.log("Order submitted:", { cartItems, formData, total });
    alert("Заказ успешно оформлен!");
    navigate("/profile/orders"); // Переход на страницу заказов в профиле
  };
  
  // Проверка если корзина пуста
  useEffect(() => {
    if (cartItems.length === 0) {
      // В реальном приложении можно добавить задержку перед редиректом
      // setTimeout(() => navigate("/catalog"), 3000);
    }
  }, [cartItems, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Корзина</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Список автомобилей */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      {...item}
                      onRemove={handleRemoveItem}
                      onUpdateDays={handleUpdateDays}
                    />
                  ))}
                </div>
                
                {/* Промокод */}
                <div className="flex items-end mb-8">
                  <div className="flex-1 max-w-xs">
                    <Label htmlFor="promoCode" className="mb-1 block">Промокод</Label>
                    <div className="flex">
                      <Input
                        id="promoCode"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Введите промокод"
                        className="rounded-r-none"
                      />
                      <Button 
                        onClick={handlePromoApply}
                        className="rounded-l-none"
                      >
                        Применить
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Форма оформления заказа */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Информация для оформления</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label htmlFor="firstName" className="mb-1 block">Имя*</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName" className="mb-1 block">Фамилия*</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="mb-1 block">Email*</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="mb-1 block">Телефон*</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+7 (999) 123-45-67"
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="address" className="mb-1 block">Адрес доставки*</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="comment" className="mb-1 block">Комментарий к заказу</Label>
                        <Textarea
                          id="comment"
                          name="comment"
                          value={formData.comment}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto"
                      size="lg"
                    >
                      Оформить заказ
                    </Button>
                  </form>
                </div>
              </div>
              
              {/* Сводка заказа */}
              <div>
                <Card className="sticky top-24">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Сумма заказа</h2>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Подытог</span>
                        <span>{subtotal.toLocaleString()} ₽</span>
                      </div>
                      
                      {promoDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Скидка ({promoDiscount}%)</span>
                          <span>-{discount.toLocaleString()} ₽</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Залог (возвратный)</span>
                        <span>{deposit.toLocaleString()} ₽</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Итого</span>
                      <span className="text-primary">{total.toLocaleString()} ₽</span>
                    </div>
                    
                    <div className="mt-6 text-sm text-gray-500">
                      <p className="mb-2">Залог возвращается после завершения аренды и проверки автомобиля.</p>
                      <p>Оплата производится при получении автомобиля.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center max-w-xl mx-auto">
              <Icon name="ShoppingCart" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Ваша корзина пуста</h2>
              <p className="text-gray-600 mb-6">
                Выберите автомобили из нашего каталога для оформления аренды.
              </p>
              <Link to="/catalog">
                <Button size="lg">
                  Перейти в каталог
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
