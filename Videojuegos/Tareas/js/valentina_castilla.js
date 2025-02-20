/*  
    Actividad ejercicios iniciales javascript

    Valentina Castilla Melgoza
    12/02/2025
*/

"use strict"; // para validar mejor los errores

// Esta funcion recibe un string y regresa el primer caracter que no se repite 
export function firstNonRepeating(string)
{
    for(let i = 0; i<string.length; i++) //Length tamaño string
    {
        let repeated = false;
        for(let j = 0; j<string.length; j++)
        {
            if (string[i] == string[j] && i != j)
            {
                repeated = true;
                break;
            }
        }
        console.log(`Char: ${string[i]}, repeated: ${repeated}`); // Imprimer si es que se repite cada variable
        if (!repeated)
        {
            return string[i];
        }
    }
    
}

// Recibe una lista de numeros y la ordena de menor a mayor usando el metodo bubble sort
export function bubbleSort(list)
{
    if(list.length == 0)
    {
        return [];
    }
    let flag;
    for (let i = 0; i < (list.length - 1); i++)
    {
        flag = true;
        for (let j = 0; j < (list.length - 1 - i); j++)
        {
            if(list[j+1] < list[j])
            {
                let temp = list[j+1];
                list[j+1] = list[j];
                list[j] = temp;
                flag = false;
            }
        }
        if (flag)
        {
            return list;
        }
    }
    return list;
}

// Invertir un arreglo sin modificar el original, regresa un nuevo arreglo
export function invertArray(arreglo) 
{
    let a =[];
    for(let i = (arreglo.length - 1); i >= 0; i--)
    {
        a.push(arreglo[i]);
    }
    return a;
}

// Invertir un arreglo modificando el original
export function invertArrayInplace(arreglo)
{
    for(let i = 0; i < (arreglo.length / 2); i++)
    {
        let j = arreglo.length -1 - i;
        let temp = arreglo[i];
        arreglo[i] = arreglo[j];
        arreglo[j] = temp;            
    }
}

// Convierte a mayusculas la primera letra de cada palabra en un string
export function capitalize(string)
{
    if(string.length == 0)
    {
        return "";
    }
    let palabras = string.split(" "); // Crea arreglo con palabras de la cadena de texto
    for(let i = 0; i < palabras.length; i++)
    {
        palabras[i] = palabras[i][0].toUpperCase() + palabras[i].slice(1);
    }
    let stringCap = palabras.join(" ");
    return stringCap;
}

// Calcula el MCD de dos numeros
export function mcd(num_1, num_2)
{
    if(num_1 == 0 && num_2 == 0)
    {
        return 0;
    }
    let min;
    let max;
    if(num_1 < num_2)
    {
        min = num_1;
        max = num_2
    }
    min = num_2;
    max = num_1
    for(let i = min; i >= 1; i--)
    {
        if(Number.isInteger(min / i) == true) // https://www.geeksforgeeks.org/javascript-program-to-check-if-a-number-is-float-or-integer/
        {
            if(Number.isInteger(max / i) == true)
            {
                return i;
            }
        }
    }
}

// Convierte un string a hacker speak
export function hackerSpeak(string)
{
    let nuevoTexto = "";
    for (let i = 0; i < string.length; i++)
    {
        if(string[i] == "a" || string[i] == "A")
        {
            nuevoTexto = nuevoTexto + "4";
        }
        else if(string[i] == "e" || string[i] == "E")
        {
            nuevoTexto = nuevoTexto + "3";
        }
        else if(string[i] == "i" || string[i] == "I")
        {
            nuevoTexto = nuevoTexto + "1";
        }
        else if(string[i] == "o" || string[i] == "O")
        {
            nuevoTexto = nuevoTexto + "0";
        }
        else if(string[i] == "s" || string[i] == "S")
        {
            nuevoTexto = nuevoTexto + "5";
        }
        else
        {
            nuevoTexto = nuevoTexto + string[i];
        }
    }
    return nuevoTexto;
}

// Calcula los factores de un numero y los regresa en un arreglo
export function factorize(num)
{
    let array = [];
    for (let i = num; i >= 1; i--)
    {
        if(Number.isInteger(num / i) == true)
        {
            array.push(i);
        }
    }
    invertArrayInplace(array);
    return array;
}

// Elimina los elementos duplicados de un arreglo y lo regresa como un nuevo arreglo
export function deduplicate(array)
{
    let newArray = array.slice();
    for(let i = 0; i < newArray.length; i++)
    {
        for(let j = i+1; j < newArray.length; j++)
        {
            if(newArray[i] == newArray[j])
            {
                newArray.splice(j, 1);
                j--;
            }
        }
    }
    return newArray;
}

// Encuentra la palabra mas corta en un arreglo de strings y regresa su longitud
export function findShortestString(list)
{
    if(list.length == 0)
    {
        return 0;
    }
    let shortest = list[0].length;
    for (let i = 1; i < list.length; i++)
    {
        if (list[i].length < shortest)
        {
            shortest = list[i].length;
        }
    }
    return shortest;
}

// Analiza si un string es palindromo
export function isPalindrome(string)
{
    if(string.length == 0)
    {
        return true;
    }
    let esPalindromo = true;
    for (let i = 0; i < (string.length / 2); i++)
    {
        let j = string.length - 1 - i;
        if (string[i] != string[j])
        {
            esPalindromo = false;
        }
    }
    return esPalindromo;
}

// Ordena un arreglo de strings en orden alfabetico
export function sortStrings(listString)
{
    let newList = listString.slice();
    let flag;
    for (let i = 0; i < (newList.length - 1); i++)
    {
        flag = true;
        for (let j = 0; j < (newList.length - 1 - i); j++)
        {
            if(newList[j+1] < newList[j])
            {
                let temp = newList[j+1];
                newList[j+1] = newList[j];
                newList[j] = temp;
                flag = false;
            }
        }   
        if (flag)
        {
            break;
        }
    }
    return newList;
}

// Recibe una lista de numeros y regresa la media y la moda
export function stats(listNum)
{
    let newList = [];
    if(listNum.length == 0)
    {
        newList.push(0);
        newList.push(0);
        return newList;
    }
    // Calcular media
    let media = 0;
    let suma = 0;
    // Calcular moda
    let moda = listNum[0];
    let reps = 0;
    for(let i = 0; i < listNum.length; i++)
    {
        suma += listNum[i];
        let reps2 = 0;
        for(let j = i+1; j < listNum.length; j++)  
        {
            if(listNum[i] == listNum[j])
            {
                reps2++;
                if(reps2 > reps) 
                {
                    reps = reps2
                    moda = listNum[i];
                }
            }
        }         
    }
    media = suma / listNum.length;
    newList.push(media);
    newList.push(moda);
    return newList;
}

// Toma una lista de strings y regresa el string que mas se repite
export function popularString(listString)
{
    if(listString.length == 0)
    {
        return "";
    }
    let popular = listString[0];
    let reps = 0;
    for(let i = 0; i < listString.length; i++)
    {
        let reps2 = 0;
        for(let j = i+1; j < listString.length; j++)  
        {
            if(listString[i] == listString[j])
            {
                reps2++;
                if(reps2 > reps) 
                {
                    reps = reps2;
                    popular = listString[i];
                }
            }
        }      
        
    }
    return popular;
}

// Calcula si un numero es potencia de 2
export function isPowerOf2(num)
{
    if (num == 1)
    {
        return true;
    }
    else if (num < 1)
    {
        return false;
    }
    return isPowerOf2(num/2);
}

// Ordena un arreglo de menor a mayor
export function sortDescending(array)
{
    bubbleSort(array);
    let newArray = invertArray(array);
    return newArray;
}


