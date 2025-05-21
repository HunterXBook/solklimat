const InstallationPage = () => {
  // Данные для таблицы услуг
  const serviceItems = [
    { id: 1, service: "Стандартный монтаж кондиционера до 3,5 кВт", price: 8000 },
    { id: 2, service: "Стандартный монтаж кондиционера от 3,5 до 5,5 кВт", price: 9500 },
    { id: 3, service: "Стандартный монтаж кондиционера от 5,5 до 7,5 кВт", price: 12000 },
    { id: 4, service: "Дополнительный метр трассы", price: 1200 },
    { id: 5, service: "Штроба в бетоне за метр", price: 1500 },
    { id: 6, service: "Штроба в кирпиче за метр", price: 1000 },
    { id: 7, service: "Штроба в гипсокартоне за метр", price: 500 },
    { id: 8, service: "Сверление отверстия в бетоне", price: 1500 },
    { id: 9, service: "Сверление отверстия в кирпиче", price: 1000 },
    { id: 10, service: "Монтаж на высоте более 3 метров (за этаж)", price: 1500 },
    { id: 11, service: "Монтаж наружного блока на вентилируемый фасад", price: 3000 },
    { id: 12, service: "Монтаж наружного блока методом промышленного альпинизма", price: 8000 },
    { id: 13, service: "Установка защитного козырька", price: 1500 },
    { id: 14, service: "Установка дренажной помпы", price: 3500 },
    { id: 15, service: "Установка зимнего комплекта", price: 4000 },
    { id: 16, service: "Демонтаж кондиционера до 3,5 кВт", price: 3000 },
    { id: 17, service: "Демонтаж кондиционера от 3,5 до 7 кВт", price: 4000 },
    { id: 18, service: "Заправка фреоном (за грамм)", price: 150 },
    { id: 19, service: "Диагностика кондиционера", price: 2000 },
    { id: 20, service: "Чистка и дезинфекция кондиционера", price: 3500 }
  ];

  // Данные для таблицы стоимости стандартного монтажа
  const standardInstallationPrices = [
    { power: "До 3.0 кВт (07/09 BTU)", area: "До 30 м²", price: 16500 },
    { power: "До 4.0 кВт (12 BTU)", area: "До 40 м²", price: 17500 },
    { power: "До 6.0 кВт (18 BTU)", area: "До 50 м²", price: 19500 }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-12">Монтаж кондиционеров</h1>
      
      {/* Верхние информационные блоки */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Стандартный монтаж */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            {/* Временный плейсхолдер для изображения */}
            <div className="text-gray-500 text-center p-4">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <p>Изображение стандартного монтажа</p>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Стандартный монтаж</h3>
            <p className="text-gray-600 mb-4">Самый простой и дешёвый способ установки кондиционера</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">от 8 000 ₽</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Подробнее
              </button>
            </div>
          </div>
        </div>
        
        {/* Нестандартный монтаж */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            {/* Временный плейсхолдер для изображения */}
            <div className="text-gray-500 text-center p-4">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
              <p>Изображение нестандартного монтажа</p>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Нестандартный монтаж</h3>
            <p className="text-gray-600 mb-4">Индивидуальное решение с учётом особенностей помещения</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">от 12 000 ₽</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Раздел "Что такое стандартный монтаж" */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-left">Стандартный монтаж кондиционера: всё, что нужно знать</h2>
        
        <div className="prose max-w-none text-left">
          <h3 className="text-xl font-semibold mb-4 text-left">Что включает стандартный монтаж?</h3>
          <p className="mb-4 text-left">
            Стандартный монтаж кондиционера представляет собой оптимальное решение для быстрой и экономичной установки климатической системы. Главная особенность такого монтажа — размещение наружного блока непосредственно под окном помещения, что позволяет выполнить все работы за один визит специалистов.
          </p>
          
          <div className="mb-8">
            <img 
              src="/images/installation/standard-installation.png" 
              alt="Схема стандартного монтажа кондиционера" 
              className="w-full max-w-3xl mx-auto mb-6"
            />
          </div>
          
          <p className="font-medium mb-2 text-left">В комплекс работ входит:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-left">
            <li>Монтаж внешнего блока под окном (верхний край располагается ниже уровня подоконника)</li>
            <li>Установка внутреннего блока на оконной или прилегающей стене</li>
            <li>Прокладка 4 метров фреоновой магистрали в комплекте</li>
            <li>Установка 1 метра декоративного короба (60×60 мм)</li>
            <li>Сверление одного технологического отверстия диаметром 45-50 мм</li>
            <li>Фиксация внутреннего блока на высоте 10-20 см от потолка</li>
            <li>Организация естественного отвода конденсата (самотёком)</li>
            <li>Подключение к электросети, вальцовка соединений и вакуумация системы</li>
            <li>Запуск и настройка кондиционера</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-4 text-left">Стоимость стандартного монтажа</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-2 text-left">Мощность кондиционера</th>
                  <th className="border px-4 py-2 text-left">Площадь охлаждения</th>
                  <th className="border px-4 py-2 text-left">Стоимость</th>
                </tr>
              </thead>
              <tbody>
                {standardInstallationPrices.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 text-left">{item.power}</td>
                    <td className="border px-4 py-2 text-left">{item.area}</td>
                    <td className="border px-4 py-2 text-left">{item.price.toLocaleString()} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-left">Этапы стандартного монтажа</h3>
          <ol className="list-decimal pl-6 mb-6 space-y-2 text-left">
            <li>Подготовительные работы — оценка помещения, разметка точек фиксации блоков</li>
            <li>Монтаж наружного блока — установка кронштейнов и фиксация внешнего модуля под окном</li>
            <li>Установка внутреннего блока — монтаж крепления и фиксация блока на оптимальной высоте</li>
            <li>Прокладка коммуникаций — сверление отверстия, протяжка фреоновой магистрали</li>
            <li>Финишные работы — установка декоративного короба, подключение к электропитанию</li>
            <li>Пусконаладка — вакуумация системы, проверка герметичности, запуск и настройка</li>
          </ol>
          
          <h3 className="text-xl font-semibold mb-4 text-left">Требования к размещению блоков</h3>
          <p className="font-medium mb-2 text-left">Внутренний блок:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-left">
            <li>Расстояние до потолка и боковых стен — минимум 10 см</li>
            <li>Отступ от оконных гардин — не менее 30 см</li>
            <li>Поток воздуха не должен быть направлен на рабочие и спальные места</li>
            <li>Положение должно обеспечивать равномерное распределение охлажденного воздуха</li>
          </ul>
          
          <p className="font-medium mb-2 text-left">Внешний блок:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-left">
            <li>Монтаж только на несущую стену</li>
            <li>Зазор между стеной и блоком — 10-15 см</li>
            <li>Расположение на уровне ниже подоконника</li>
            <li>Доступность для последующего обслуживания</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-4 text-left">Почему стандартный монтаж — оптимальный выбор?</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-left">
            <li>Скорость — установка занимает всего 2-3 часа</li>
            <li>Экономия — минимальный расход материалов и трудозатрат</li>
            <li>Эстетика — аккуратная прокладка коммуникаций с минимумом видимых элементов</li>
            <li>Удобство обслуживания — легкий доступ к блокам для сервисных работ</li>
            <li>Надёжность — соответствие всем техническим требованиям производителей</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-4 text-left">Когда требуется нестандартный монтаж?</h3>
          <p className="mb-4 text-left">
            Стандартный монтаж может не подойти в следующих случаях:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-left">
            <li>Требуется фреоновая магистраль длиннее 4 метров</li>
            <li>Необходима установка наружного блока выше уровня окна</li>
            <li>Сложная архитектура фасада здания (вентилируемый фасад, ограждения и т.д.)</li>
            <li>Требуется скрытая прокладка коммуникаций со штроблением</li>
            <li>Невозможен естественный отвод конденсата</li>
          </ul>
          <p className="text-left">
            В этих ситуациях мы предложим индивидуальное решение с учетом всех особенностей вашего помещения.
          </p>
        </div>
      </div>
      
      {/* Таблица с прайсом */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold p-6 bg-gray-50 border-b text-left">Прайс на услуги монтажа</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Услуга</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена, ₽</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {serviceItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-left">{item.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left font-medium">{item.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstallationPage;
