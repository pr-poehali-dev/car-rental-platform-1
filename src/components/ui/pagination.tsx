
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Генерация массива страниц для отображения
  const getPageNumbers = () => {
    const pages = [];
    
    // Всегда показываем первую страницу
    pages.push(1);
    
    // Вычисляем диапазон страниц вокруг текущей
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Добавляем многоточие после первой страницы, если нужно
    if (startPage > 2) {
      pages.push("...");
    }
    
    // Добавляем страницы в диапазоне
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Добавляем многоточие перед последней страницей, если нужно
    if (endPage < totalPages - 1) {
      pages.push("...");
    }
    
    // Всегда показываем последнюю страницу, если она существует
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  // Если всего одна страница, не показываем пагинацию
  if (totalPages <= 1) {
    return null;
  }
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon name="ChevronLeft" className="h-4 w-4" />
      </Button>
      
      {pageNumbers.map((page, index) => (
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </Button>
        )
      ))}
      
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon name="ChevronRight" className="h-4 w-4" />
      </Button>
    </div>
  );
}
