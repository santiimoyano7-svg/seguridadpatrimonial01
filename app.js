const modules = {
 
dashboard: `
<h2>Dashboard SOC</h2>
 
<div class="stats">
 
<div class="card">
🚨 Alertas Activas
<h1>8</h1>
</div>
 
<div class="card">
🚶 Rondas Pendientes
<h1>2</h1>
</div>
 
<div class="card">
📹 CCTV con Fallas
<h1>3</h1>
</div>
 
<div class="card">
🔑 Llaves Entregadas
<h1>6</h1>
</div>
 
</div>
`,
 
guardia: `
<h2>Libro Digital Guardia</h2>
 
<div class="card">
14:20 - Precinto faltante detectado
</div>
 
<div class="card">
14:35 - Cámara 08 fuera servicio
</div>
 
<div class="card">
15:10 - Chofer sin EPP
</div>
`,
 
alertas: `
<h2>Centro de Alertas</h2>
 
<div class="card">
🚨 Precinto faltante
</div>
 
<div class="card">
⚠ Llave vencida
</div>
 
<div class="card">
ℹ Correspondencia recibida
</div>
`,
 
rondas: `
<h2>Rondas Inteligentes</h2>
 
<div class="card">
 
Circuito Norte
 
<br><br>
 
✅ Escanear QR
 
<br><br>
 
Checklist:
 
<ul>
 
<li>Candado colocado</li>
 
<li>Sin daños visibles</li>
 
<li>Iluminación operativa</li>
 
</ul>
 
</div>
`,
 
transporte: `
<h2>Transporte Seguro</h2>
 
<div class="card">
 
Empresa:
Transportes Aimar
 
<br><br>
 
✅ Satelital
 
<br>
 
✅ Precinto
 
<br>
 
✅ Candado
 
<br>
 
⚠ Matafuego próximo vencimiento
 
</div>
`,
 
llaves: `
<h2>Gestión de Llaves</h2>
 
<div class="card">
 
🔑 Sala Tintas
 
<br>
 
Entregada a Juan Pérez
 
<br>
 
Hace 190 minutos
 
</div>
`,
 
cofres: `
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
`,
 
cctv: `
<h2>CCTV</h2>
 
<div class="card">
 
CAM 01 ✅
 
<br>
 
CAM 02 ✅
 
<br>
 
CAM 03 ⚠
 
<br>
 
CAM 04 ❌
 
</div>
`,
 
precintos: `
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
`
};
 
function showModule(module){
document.getElementById("content").innerHTML =
modules[module];
}
 
showModule("dashboard");
