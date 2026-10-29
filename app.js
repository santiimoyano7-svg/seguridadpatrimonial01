const modules = {
2
 
3
dashboard: `
4
<h2>Dashboard SOC</h2>
5
 
6
<div class="stats">
7
 
8
<div class="card">
9
🚨 Alertas Activas
10
<h1>8</h1>
11
</div>
12
 
13
<div class="card">
14
🚶 Rondas Pendientes
15
<h1>2</h1>
16
</div>
17
 
18
<div class="card">
19
📹 CCTV con Fallas
20
<h1>3</h1>
21
</div>
22
 
23
<div class="card">
24
🔑 Llaves Entregadas
25
<h1>6</h1>
26
</div>
27
 
28
</div>
29
`,
30
 
31
guardia: `
32
<h2>Libro Digital Guardia</h2>
33
 
34
<div class="card">
35
14:20 - Precinto faltante detectado
36
</div>
37
 
38
<div class="card">
39
14:35 - Cámara 08 fuera servicio
40
</div>
41
 
42
<div class="card">
43
15:10 - Chofer sin EPP
44
</div>
45
`,
46
 
47
alertas: `
48
<h2>Centro de Alertas</h2>
49
 
50
<div class="card">
51
🚨 Precinto faltante
52
</div>
53
 
54
<div class="card">
55
⚠ Llave vencida
56
</div>
57
 
58
<div class="card">
59
ℹ Correspondencia recibida
60
</div>
61
`,
62
 
63
rondas: `
64
<h2>Rondas Inteligentes</h2>
65
 
66
<div class="card">
67
 
68
Circuito Norte
69
 
70
<br><br>
71
 
72
✅ Escanear QR
73
 
74
<br><br>
75
 
76
Checklist:
77
 
78
<ul>
79
 
80
<li>Candado colocado</li>
81
 
82
<li>Sin daños visibles</li>
83
 
84
<li>Iluminación operativa</li>
85
 
86
</ul>
87
 
88
</div>
89
`,
90
 
91
transporte: `
92
<h2>Transporte Seguro</h2>
93
 
94
<div class="card">
95
 
96
Empresa:
97
Transportes Aimar
98
 
99
<br><br>
100
 
101
✅ Satelital
102
 
103
<br>
104
 
105
✅ Precinto
106
 
107
<br>
108
 
109
✅ Candado
110
 
111
<br>
112
 
113
⚠ Matafuego próximo vencimiento
114
 
115
</div>
116
`,
117
 
118
llaves: `
119
<h2>Gestión de Llaves</h2>
120
 
121
<div class="card">
122
 
123
🔑 Sala Tintas
124
 
125
<br>
126
 
127
Entregada a Juan Pérez
128
 
129
<br>
130
 
131
Hace 190 minutos
132
 
133
</div>
134
`,
135
 
136
cofres: `
137
<h2>Vestuario Propio Masculino</h2>
138
 
139
<div class="card">
140
 
141
🟢 001
142
 
143
🟢 002
144
 
145
🔵 003
146
 
147
🟠 004
148
 
149
🔴 005
150
 
151
<br><br>
152
 
153
🟢 Ocupado
154
 
155
<br>
156
 
157
🔵 Libre
158
 
159
<br>
160
 
161
🔴 Roto
162
 
163
<br>
164
 
165
🟠 Sin Declarar
166
 
167
</div>
168
`,
169
 
170
cctv: `
171
<h2>CCTV</h2>
172
 
173
<div class="card">
174
 
175
CAM 01 ✅
176
 
177
<br>
178
 
179
CAM 02 ✅
180
 
181
<br>
182
 
183
CAM 03 ⚠
184
 
185
<br>
186
 
187
CAM 04 ❌
188
 
189
</div>
190
`,
191
 
192
precintos: `
193
<h2>Control de Precintos</h2>
194
 
195
<div class="card">
196
 
197
Puerta 01
198
 
199
<br>
200
 
201
Precinto 554878
202
 
203
<br>
204
 
205
🟢 Conforme
206
 
207
</div>
208
 
209
<div class="card">
210
 
211
Puerta 02
212
 
213
<br>
214
 
215
Precinto 554879
216
 
217
<br>
218
 
219
🔴 Faltante
220
 
221
</div>
222
`
223
};
224
 
225
function showModule(module){
226
document.getElementById("content").innerHTML =
227
modules[module];
228
}
229
 
230
showModule("dashboard");
