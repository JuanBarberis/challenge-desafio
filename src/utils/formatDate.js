function formatDate(date) {
    // Obtén el día, el mes y el año de la fecha
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = date.getFullYear();

    // Retorna la fecha formateada
    return `${day}-${month}-${year}`;
}

export default formatDate;