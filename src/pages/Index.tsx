
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import Icon from "@/components/ui/icon";

const carsData = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Бизнес",
    image: "https://images.unsplash.com/photo-1621007806655-72b0a4e98c1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 4500,
    seats: 5,
    transmission: "Автомат"
  },
  {
    id: 2,
    name: "Volkswagen Polo",
    category: "Эконом",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 2500,
    seats: 5,
    transmission: "Механика"
  },
  {
    id: 3,
    name: "BMW X5",
    category: "Премиум",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 8000,
    seats: 5,
    transmission: "Автомат"
  },
  {
    id: 4,
    name: "Kia Rio",
    category: "Эконом",
    image: "https://images.unsplash.com/photo-1543854589-fdd815f176e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 2000,
    seats: 5,
    transmission: "Механика"
  },
  {
    id: 5,
    name: "Mercedes-Benz E-Class",
    category: "Бизнес",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 6500,
    seats: 5,
    transmission: "Автомат"
  },
  {
    id: 6,
    name: "Hyundai Creta",
    category: "Кроссовер",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 3500,
    seats: 5,
    transmission: "Автомат"
  }
];

const features = [
  {
    icon: "Shield",
    title: "Страховка включена",
    description: "Все автомобили застрахованы по КАСКО и ОСАГО"
  },
  {
    icon: "Clock",
    title: "Быстрая подача",
    description: "Доставим автомобиль в течение 2-х часов"
  },
  {
    icon: "Sparkles",
    title: "Новый автопарк",
    description: "Средний возраст наших автомобилей — 1.5 года"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Аренда автомобилей для любых целей
            </h1>
            <p className="text-xl mb-8">
              Широкий выбор автомобилей от эконом до премиум класса по доступным ценам. 
              Быстрое оформление и подача.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Выбрать автомобиль
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Icon name={feature.icon} className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Cars */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Популярные автомобили</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Выбирайте из самых популярных моделей нашего автопарка. 
              Все автомобили проходят регулярное техническое обслуживание.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {carsData.map(car => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="inline-flex items-center">
              Смотреть все автомобили
              <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы забронировать автомобиль?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Забронируйте автомобиль прямо сейчас и получите скидку 10% 
            на вашу первую поездку!
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
          >
            Забронировать
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
