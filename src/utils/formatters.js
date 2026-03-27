// src/utils/formatters.js

export const formatearRUT = (value) => {
  const clean = value.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length === 0) return '';
  if (clean.length <= 1) return clean;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedBody}-${dv}`;
};

export const formatearNombre = (value) => {
  return value.replace(/\b\w/g, l => l.toUpperCase());
};

export const soloNumeros = (value) => {
  return value.replace(/[^0-9]/g, '');
};

export const formatearTelefono = (value) => {
  return value.replace(/[^0-9+ ]/g, '');
};

export const formatearDinero = (value) => {
  const numeros = value.replace(/[^0-9]/g, '');
  if (!numeros) return '';
  const formateado = new Intl.NumberFormat('es-CL').format(numeros);
  return `$ ${formateado}`;
};

export const limpiarDinero = (value) => {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
};

export const normalizar = (texto) => {
  if (!texto) return '';
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};