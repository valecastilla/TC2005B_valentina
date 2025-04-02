/**
 * Archivo: eventos_dom.js
 * Descripción: Soluciones para los ejercicios de DOM y eventos
 */

// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    // Ejercicio 1: Mostrar la posición del mouse
    const mousePositionElement = document.getElementById('mousePosition');
    
    // Añadir un evento para seguir la posición del mouse en todo el documento
    document.addEventListener('mousemove', (event) => {
        mousePositionElement.textContent = `Posición del mouse: X: ${event.clientX}, Y: ${event.clientY}`;
    });

    // Ejercicio 2: Obtener nombre completo del formulario
    const form1 = document.getElementById('form1');
    const formSubmit = document.getElementById('form1-submit');
    
    form1.addEventListener('submit', (event) => {
        // Prevenir que el formulario se envíe
        event.preventDefault();
        
        // Obtener valores de los campos
        const firstName = document.getElementById('form-fname').value;
        const lastName = document.getElementById('form-lname').value;
        
        // Verificar si ya existe un elemento con el nombre completo
        let fullNameElement = document.getElementById('fullName');
        
        if (!fullNameElement) {
            // Crear un nuevo elemento si no existe
            fullNameElement = document.createElement('p');
            fullNameElement.id = 'fullName';
            // Insertar después del botón de envío
            form1.appendChild(fullNameElement);
        }
        
        // Actualizar el contenido
        fullNameElement.textContent = `Nombre completo: ${firstName} ${lastName}`;
    });

    // Ejercicio 3: Agregar filas o columnas a una tabla
    const sampleTable = document.getElementById('sampleTable');
    const insertRowBtn = document.getElementById('btn-insert-r');
    const insertColBtn = document.getElementById('btn-insert-c');
    
    // Función para insertar una nueva fila
    insertRowBtn.addEventListener('click', () => {
        const rowCount = sampleTable.rows.length;
        const newRow = sampleTable.insertRow();
        
        // Añadir celdas basadas en el número de columnas en la primera fila
        const columnCount = sampleTable.rows[0].cells.length;
        
        for (let i = 0; i < columnCount; i++) {
            const newCell = newRow.insertCell();
            newCell.textContent = `Row ${rowCount + 1} column ${i + 1}`;
        }
    });
    
    // Función para insertar una nueva columna
    insertColBtn.addEventListener('click', () => {
        const rows = sampleTable.rows;
        const columnCount = rows[0].cells.length;
        
        // Recorrer todas las filas y añadir una nueva celda a cada una
        for (let i = 0; i < rows.length; i++) {
            const newCell = rows[i].insertCell();
            newCell.textContent = `Row ${i + 1} column ${columnCount + 1}`;
        }
    });

    // Ejercicio 4: Actualizar celda específica de la tabla
    const myTable = document.getElementById('myTable');
    const rowIndexInput = document.getElementById('rowIndex');
    const colIndexInput = document.getElementById('colIndex');
    const newValueInput = document.getElementById('newValue');
    const changeBtn = document.getElementById('btn-change');
    
    changeBtn.addEventListener('click', () => {
        // Obtener valores de los inputs
        const rowIndex = parseInt(rowIndexInput.value);
        const colIndex = parseInt(colIndexInput.value);
        const newValue = newValueInput.value;
        
        // Validar índices (el usuario usa índices comenzando en 1)
        if (isNaN(rowIndex) || isNaN(colIndex) || 
            rowIndex < 1 || rowIndex > myTable.rows.length || 
            colIndex < 1 || colIndex > myTable.rows[0].cells.length) {
            alert('Índices fuera de rango. Por favor verifica los valores.');
            return;
        }
        
        // Convertir índices a base 0 para JavaScript
        const adjustedRowIndex = rowIndex - 1;
        const adjustedColIndex = colIndex - 1;
        
        // Actualizar el contenido de la celda
        myTable.rows[adjustedRowIndex].cells[adjustedColIndex].textContent = newValue;
        
        // Limpiar los inputs
        rowIndexInput.value = '';
        colIndexInput.value = '';
        newValueInput.value = '';
    });
    
    // Ejercicio 5: Agregar o quitar colores de una lista
    const colorSelect = document.getElementById('colorSelect');
    const addColorBtn = document.getElementById('btn-add-color');
    const removeColorBtn = document.getElementById('btn-rmv-color');
    
    // Array de colores aleatorios para añadir
    const availableColors = [
        'Blue', 'Yellow', 'Purple', 'Orange', 'Pink', 
        'Brown', 'Teal', 'Navy', 'Maroon', 'Olive',
        'Lime', 'Aqua', 'Fuchsia', 'Silver', 'Gray'
    ];
    
    // Función para añadir un color aleatorio
    addColorBtn.addEventListener('click', () => {
        // Filtrar colores que ya están en el select
        const existingColors = Array.from(colorSelect.options).map(option => option.text);
        const availableToAdd = availableColors.filter(color => !existingColors.includes(color));
        
        if (availableToAdd.length > 0) {
            // Seleccionar un color aleatorio entre los disponibles
            const randomIndex = Math.floor(Math.random() * availableToAdd.length);
            const newColor = availableToAdd[randomIndex];
            
            // Crear y añadir la nueva opción
            const newOption = document.createElement('option');
            newOption.text = newColor;
            colorSelect.add(newOption);
        } else {
            alert('No hay más colores disponibles para añadir.');
        }
    });
    
    // Función para eliminar el color seleccionado
    removeColorBtn.addEventListener('click', () => {
        const selectedIndex = colorSelect.selectedIndex;
        
        if (selectedIndex !== -1) {
            colorSelect.remove(selectedIndex);
        } else {
            alert('Por favor, selecciona un color para eliminar.');
        }
    });

    // Ejercicio 6: Cambiar tamaño de imagen al pasar el mouse
    const catImage = document.getElementById('imagenGato');
    
    catImage.addEventListener('mouseenter', () => {
        // Generar dimensiones aleatorias entre 300 y 600
        const randomWidth = Math.floor(Math.random() * 301) + 300;  // 300-600
        const randomHeight = Math.floor(Math.random() * 301) + 300; // 300-600
        
        // Actualizar la imagen con nuevas dimensiones
        catImage.src = `http://placecats.com/${randomWidth}/${randomHeight}`;
        catImage.width = randomWidth;
        catImage.height = randomHeight;
    });
});