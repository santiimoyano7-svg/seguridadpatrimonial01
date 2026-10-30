function loadModule(module){
 
const content =
document.getElementById("content");
 
if(module==="dashboard"){
 
content.innerHTML = `
 
<h2>Dashboard Ejecutivo</h2>
 
<br>
 
<div class="stats">
 
<div class="stat">
<div class="stat-title">
Alertas Activas
</div>
 
<div class="stat-value">
8
</div>
</div>
 
<div class="stat">
<div class="stat-title">
Rondas Pendientes
</div>
 
<div class="stat-value">
2
</div>
</div>
 
<div class="stat">
<div class="stat-title">
Transportes
</div>
 
<div class="stat-value">
14
</div>
</div>
 
<div class="stat">
<div class="stat-title">
Llaves Entregadas
</div>
 
<div class="stat-value">
6
</div>
</div>
 
</div>
 
<br>
 
<div class="card">
 
<h3>Últimas novedades</h3>
 
<br>
 
🚨 Precinto faltante Puerta 2
 
<br><br>
 
📹 Cámara 04 fuera de servicio
 
<br><br>
 
🚛 Transporte sin reporte satelital
 
</div>
 
`;
 
}
 
if(module==="alertas"){
 
content.innerHTML = `
 
<h2>Centro de Alertas</h2>
 
<br>
 
<div class="card">
🚨 Precinto faltante
</div>
 
<div class="card">
⚠ Llave vencida
</div>
 
<div class="card">
ℹ Correspondencia recibida
</div>
 
`;
 
}
 
if(module==="guardia"){
 
content.innerHTML = `
 
<h2>Libro Digital de Guardia</h2>
 
<br>
 
<div class="card">
 
14:20
 
<br><br>
 
Precinto faltante detectado.
 
</div>
 
<div class="card">
 
15:10
 
<br><br>
 
Chofer sin EPP.
 
</div>
 
`;
 
}
 
if(module==="rondas"){
 
content.innerHTML = `
 
<h2>Rondas Inteligentes</h2>
 
<div class="card">
 
Circuito:
Perimetral Norte
 
<br><br>
 
Punto Actual:
 
<b>Portón Norte</b>
 
<br><br>
 
✅ Escanear QR
 
<br><br>
 
Checklist:
 
<ul>
 
<li>Candado colocado</li>
 
<li>Sin daños visibles</li>
 
<li>Iluminación operativa</li>
 
<li>Sin personas ajenas</li>
 
</ul>
 
</div>
 
`;
 
}
 
if(module==="transporte"){
 
content.innerHTML = `
 
<h2>Transporte Seguro</h2>
 
<div class="card">
 
Empresa:
Transportes Aimar
 
<br><br>
 
✅ Satelital Operativo
 
<br>
 
✅ Precinto N° 554872
 
<br>
 
✅ Candado Blindado
 
<br>
 
⚠ Matafuego próximo vencimiento
 
</div>
 
`;
 
}
 
if(module==="llaves"){
 
content.innerHTML = `
 
<h2>Gestión de Llaves</h2>
 
<div class="card">
 
🔑 Sala Tintas
 
<br>
 
Juan Pérez
 
<br>
 
190 minutos
 
<br><br>
 
🚨 Alerta Crítica
 
</div>
 
<div class="card">
 
🟢 Laboratorio
 
<br>
 
Disponible
 
</div>
 
`;
 
}
 
if(module==="cofres"){
 
content.innerHTML = `
 
<h2>Vestuario Propio Masculino</h2>
 
<div class="card">
 
🟢 001
🟢 002
🔵 003
🟠 004
🔴 005
 
<br><br>
 
🟢 Ocupado
 
<br>
 
🔵 Libre
 
<br>
 
🔴 Roto
 
<br>
 
🟠 Sin Declarar
 
</div>
 
`;
 
}
 
if(module==="cctv"){
 
content.innerHTML = `
 
<h2>CCTV</h2>
 
<div class="card">
 
CAM 01 ✅
 
<br><br>
 
CAM 02 ✅
 
<br><br>
 
CAM 03 ⚠
 
<br><br>
 
CAM 04 ❌
 
</div>
 
`;
 
}
 
if(module==="precintos"){
 
content.innerHTML = `
 
<h2>Control de Precintos</h2>
 
<div class="card">
 
Puerta 01
 
<br>
 
Precinto 554878
 
<br>
 
🟢 Conforme
 
</div>
 
<div class="card">
 
Puerta 02
 
<br>
 
Precinto 554879
 
<br>
 
🔴 Faltante
 
</div>
 
`;
 
}
 
}
