
import { Link } from "react-router-dom";
import Icon from "./ui/icon";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Car" className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">АвтоПрокат</span>
            </div>
            <p className="text-gray-400 mb-4">
              Лучший сервис проката автомобилей в России с 2010 года
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <Icon name="Facebook" className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Icon name="Instagram" className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Icon name="Twitter" className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-gray-400">Москва, ул. Автомобильная, д. 10</span>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Phone" className="h-5 w-5 text-primary" />
                <span className="text-gray-400">+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Mail" className="h-5 w-5 text-primary" />
                <span className="text-gray-400">info@avtoprokat.ru</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-primary transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-400 hover:text-primary transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary transition-colors">
                  Вход в систему
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} АвтоПрокат. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
