$(document).ready(function(){ // после загрузки DOM
	$('#register-form').submit(function(e){ // вешаем событие на отправку формы
		e.preventDefault(); // выключаем стандартное действие отправки
		var form = $(this); // запомним форму в переменной

		var data = form.serialize(); // сериализуем данные формы в строку для отправки

		$.ajax({ // инициализируем аякс
            url: "send.php", // путь до нашего php обработчика, в моем случае он лежит в той же папке что и форма
            data: data, // данные  которые мы сериализовали
            type: "POST", // постом
            dataType: "json", // ответ ждем в формате json
            beforeSend: function(){ // перед отправкой
            	form.find('button').attr('disabled', true); // отключим кнопку
            },
            success: function(data) { // соединение прошло и получен ответ от обработчика
            	// внутри data будет объект, все его ключи и значения повторяют массив 
                  //который мы вернули php обработчиком в json строке, помимо ok и message 
                  //ожно сувать туда всякие другие вещи
            	if (data.ok) { // если ok != 0 то значит ошибок нет
            		form.remove(); // выпилим форму
            	}
            	$('#response').html(data.message); // и покажем сообщение от сервера
            },
            error: function(xhr, ajaxOptions, thrownError) { // если ошибка
            	console.log(arguments); // убрать после дебага
            }, 
            complete: function() { // в конце любого исхода
            	form.find('button').prop('disabled', false); // снова включим кнопку
            }
		});
	});
});