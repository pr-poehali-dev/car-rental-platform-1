
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  // Моковые данные для дашборда
  const stats = [
    { title: "Всего автомобилей", value: 24, icon: "Car", change: "+2", changeType: "positive" },
    { title: "Активные заказы", value: 8, icon: "ClipboardList", change: "+5", changeType: "positive" },
    { title: "Зарегистрировано пользователей", value: 156, icon: "Users", change: "+12", changeType: "positive" },
    { title: "Доход за месяц", value: "458,200 ₽", icon: "Banknote", change: "+15%", changeType: "positive" },
  ];

  const recentOrders = [
    { id: "ORD-7829", customer: "Иван Петров", car: "Toyota Camry", date: "02.05.2025", status: "Активен", amount: "13,500 ₽" },
    { id: "ORD-7828", customer: "Елена Смирнова", car: "BMW X5", date: "01.05.2025", status: "Активен", amount: "16,000 ₽" },
    { id: "ORD-7827", customer: "Алексей Иванов", car: "Kia Rio", date: "30.04.2025", status: "Завершен", amount: "4,500 ₽" },
    { id: "ORD-7826", customer: "Ольга Козлова", car: "Mercedes-Benz E-Class", date: "29.04.2025", status: "Завершен", amount: "19,500 ₽" },
    { id: "ORD-7825", customer: "Дмитрий Соколов", car: "Hyundai Creta", date: "28.04.2025", status: "Отменен", amount: "7,000 ₽" },
  ];

  // График загруженности автопарка по категориям
  const fleetUsage = [
    { category: "Эконом", total: 8, used: 5, percentage: 62.5 },
    { category: "Бизнес", total: 6, used: 2, percentage: 33.3 },
    { category: "Премиум", total: 4, used: 1, percentage: 25 },
    { category: "Кроссовер", total: 6, used: 0, percentage: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">{stat.title}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className={`text-xs ${
                    stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.change} за последний месяц
                  </span>
                </div>
                <div className={`p-3 rounded-full bg-primary/10 text-primary`}>
                  <Icon name={stat.icon} className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Последние заказы */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Последние заказы</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">
              Все заказы
              <Icon name="ArrowRight" className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left font-medium text-gray-500 py-3 px-4">ID</th>
                    <th className="text-left font-medium text-gray-500 py-3 px-4">Клиент</th>
                    <th className="text-left font-medium text-gray-500 py-3 px-4">Автомобиль</th>
                    <th className="text-left font-medium text-gray-500 py-3 px-4">Дата</th>
                    <th className="text-left font-medium text-gray-500 py-3 px-4">Статус</th>
                    <th className="text-right font-medium text-gray-500 py-3 px-4">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.car}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Активен" 
                            ? "bg-green-100 text-green-800" 
                            : order.status === "Завершен"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Загруженность автопарка */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Загруженность автопарка</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fleetUsage.map((category) => (
                <div key={category.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{category.category}</span>
                    <span>{category.used} из {category.total}</span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-sm font-medium">
                <span>Всего автомобилей в прокате:</span>
                <span>8 из 24</span>
              </div>
              <Progress value={33.3} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
