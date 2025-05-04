
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Icon from "./ui/icon";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Icon name="Car" className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">АвтоПрокат</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            Главная
          </Link>
          <Link to="/catalog" className="text-gray-700 hover:text-primary transition-colors">
            Каталог
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
            О нас
          </Link>
          <Link to="/contacts" className="text-gray-700 hover:text-primary transition-colors">
            Контакты
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <Icon name="ShoppingCart" className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-1">
              <Icon name="LogIn" className="h-4 w-4 mr-1" />
              <span>Войти</span>
            </Button>
          </Link>
          <button className="md:hidden">
            <Icon name="Menu" className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
