
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [error, setError] = useState("");
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Моковая проверка авторизации
    if (loginData.email === "user@example.com" && loginData.password === "password") {
      // В реальном приложении - сохранение токена авторизации, получение данных пользователя
      alert("Вы успешно вошли!");
      navigate("/profile");
    } else {
      setError("Неверный email или пароль");
    }
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Проверка совпадения паролей
    if (registerData.password !== registerData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    
    // В реальном приложении - отправка данных на сервер, регистрация
    alert("Вы успешно зарегистрировались! Выполняется вход...");
    navigate("/profile");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Личный кабинет</h1>
            
            <Card>
              <CardContent className="pt-6">
                <Tabs 
                  defaultValue="login" 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Вход</TabsTrigger>
                    <TabsTrigger value="register">Регистрация</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Label htmlFor="login-password">Пароль</Label>
                          <Link 
                            to="/reset-password" 
                            className="text-xs text-primary hover:underline"
                          >
                            Забыли пароль?
                          </Link>
                        </div>
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>
                      
                      {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded">
                          {error}
                        </div>
                      )}
                      
                      <Button type="submit" className="w-full">
                        Войти
                      </Button>
                    </form>
                    
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Или войти через</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <Button variant="outline" className="flex items-center justify-center">
                          <Icon name="Facebook" className="mr-2 h-4 w-4" />
                          Facebook
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center">
                          <Icon name="Mail" className="mr-2 h-4 w-4" />
                          Google
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="reg-firstName">Имя</Label>
                          <Input
                            id="reg-firstName"
                            name="firstName"
                            value={registerData.firstName}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="reg-lastName">Фамилия</Label>
                          <Input
                            id="reg-lastName"
                            name="lastName"
                            value={registerData.lastName}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="reg-email">Email</Label>
                        <Input
                          id="reg-email"
                          name="email"
                          type="email"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="reg-phone">Телефон</Label>
                        <Input
                          id="reg-phone"
                          name="phone"
                          value={registerData.phone}
                          onChange={handleRegisterChange}
                          placeholder="+7 (999) 123-45-67"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="reg-password">Пароль</Label>
                        <Input
                          id="reg-password"
                          name="password"
                          type="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="reg-confirm-password">Подтверждение пароля</Label>
                        <Input
                          id="reg-confirm-password"
                          name="confirmPassword"
                          type="password"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      
                      {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded">
                          {error}
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500">
                        Нажимая кнопку "Зарегистрироваться", вы соглашаетесь с{" "}
                        <Link to="/terms" className="text-primary hover:underline">условиями использования</Link>
                        {" "}и{" "}
                        <Link to="/privacy" className="text-primary hover:underline">политикой конфиденциальности</Link>.
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Зарегистрироваться
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
