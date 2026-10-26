const S=[["apersepsi","Apersepsi"],["awal","Asesmen Awal"],["materi","Materi Pokok"],["simulasi","Simulasi"],["kuis","Kuis"],["akhir","Asesmen Akhir"],["refleksi","Refleksi"]];
const st={cur:0,done:{},score:{}};const $=s=>document.querySelector(s);
const Q={awal:[["Organ tempat pencernaan kimiawi pertama kali terjadi adalah ...",["Mulut","Lambung","Usus halus","Usus besar"],0,"Enzim amilase dalam ludah mulai mengubah pati di mulut."],
["Saluran yang menghubungkan mulut dengan lambung adalah ...",["Faring saja","Kerongkongan","Usus halus","Rektum"],1,"Makanan didorong kerongkongan dengan gerak peristaltik."],
["Penyerapan sari makanan terutama terjadi di ...",["Lambung","Mulut","Usus halus","Usus besar"],2,"Dinding usus halus berlipat dan berjonjot (vili)."],
["Enzim pada ludah yang mencerna pati disebut ...",["Pepsin","Amilase","Lipase","Tripsin"],1,"Amilase mengubah pati menjadi maltosa."],
["Organ yang menghasilkan empedu adalah ...",["Pankreas","Lambung","Hati","Ginjal"],2,"Empedu dibuat di hati, disimpan di kantong empedu."]],
kuis:[["Gerak peristaltik adalah ...",["Gerak mengunyah gigi","Gerak meremas otot dinding saluran untuk mendorong makanan","Gerak menelan udara","Gerak enzim"],1,"Otot polos dinding saluran berkontraksi bergelombang."],
["Urutan bagian usus halus dari atas adalah ...",["Ileum, jejunum, duodenum","Jejunum, duodenum, ileum","Duodenum, jejunum, ileum","Duodenum, ileum, jejunum"],2,"Ingat: duodenum – jejunum – ileum."],
["Pepsin di lambung mengubah ...",["Pati menjadi glukosa","Protein menjadi pepton","Lemak menjadi asam lemak","Selulosa menjadi gula"],1,"Pepsin bekerja pada suasana asam lambung."],
["Vili usus berfungsi untuk ...",["Menghasilkan empedu","Menyimpan feses","Memperluas permukaan penyerapan","Membunuh kuman"],2,"Permukaan luas membuat penyerapan lebih efisien."],
["Organ berikut yang tidak dilalui makanan adalah ...",["Lambung","Hati","Usus besar","Kerongkongan"],1,"Hati kelenjar pencernaan; makanan tidak melewatinya."]],
akhir:[["Urutan saluran pencernaan yang benar adalah ...",["Mulut–lambung–kerongkongan–usus halus–usus besar","Mulut–kerongkongan–lambung–usus halus–usus besar–anus","Mulut–kerongkongan–usus halus–lambung–anus","Mulut–lambung–usus besar–usus halus–anus"],1,"Makanan masuk lambung setelah kerongkongan."],
["Asam klorida (HCl) lambung berfungsi ...",["Mengemulsi lemak","Menyerap air","Membunuh kuman dan mengaktifkan pepsinogen","Mencerna pati"],2,"HCl menciptakan suasana asam yang melindungi tubuh."],
["Fungsi empedu adalah ...",["Mengemulsi lemak","Mencerna protein","Menyerap glukosa","Mencerna pati"],0,"Empedu memecah lemak menjadi butiran kecil."],
["Pankreas menghasilkan enzim ...",["Hanya pepsin","Amilase, tripsin, dan lipase","Hanya empedu","Renin dan HCl"],1,"Getah pankreas mencerna pati, protein, dan lemak."],
["Fungsi utama usus besar adalah ...",["Menyerap air dan membentuk feses","Menghasilkan empedu","Mencerna protein","Menyimpan makanan"],0,"Sisa makanan dipadatkan menjadi feses."]]};
const O=[["Mulut","Gigi mengunyah (mekanik); ludah berisi enzim amilase yang mengubah pati menjadi maltosa (kimiawi); lidah membentuk bolus."],
["Kerongkongan","Saluran otot ±25 cm. Gerak peristaltik mendorong bolus ke lambung. Tidak ada pencernaan kimiawi."],
["Lambung","Kantong otot yang mengaduk makanan. Getah lambung: HCl (asam, bunuh kuman), pepsin (protein → pepton), renin. Hasilnya disebut kimus."],
["Usus halus","Duodenum, jejunum, ileum (±6–7 m). Menerima empedu dan getah pankreas. Pencernaan tuntas dan penyerapan sari makanan lewat vili."],
["Usus besar","Menyerap air dan mineral, membentuk feses; dihuni bakteri baik (misalnya penghasil vitamin K)."],
["Rektum & anus","Rektum menampung feses sementara; anus mengeluarkannya (defekasi)."],
["Hati & kantong empedu","Hati membuat empedu (mengemulsi lemak) dan menetralkan racun. Kantong empedu menyimpannya."],
["Pankreas","Menghasilkan getah pankreas: amilase, tripsin, lipase; serta hormon insulin."]];
const F={Nasi:["Amilase ludah mengubah sebagian pati menjadi maltosa.","Didorong peristaltik.","Diaduk; amilase berhenti bekerja karena asam.","Amilase pankreas dan maltase mengubah menjadi glukosa, lalu diserap darah.","Sisa serat dipadatkan, air diserap."],
Telur:["Dikunyah menjadi halus (mekanik).","Didorong peristaltik.","HCl dan pepsin mengubah protein menjadi pepton.","Tripsin dan peptidase mengubah pepton menjadi asam amino, lalu diserap darah.","Sisa tak tercerna dipadatkan, air diserap."],
Gorengan:["Dikunyah; belum ada pencernaan lemak berarti.","Didorong peristaltik.","Diaduk; lemak hanya tercerna sedikit.","Empedu mengemulsi lemak, lipase mengubahnya menjadi asam lemak dan gliserol, lalu diserap.","Sisa dipadatkan, air diserap."]};
const sh=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
function nav(){$("#nav").innerHTML=S.map((s,i)=>`<button class="${i==st.cur?'on':''} ${st.done[s[0]]?'done':''}" onclick="go(${i})">${s[1]}</button>`).join("")}
function go(i){st.cur=i;nav();window.scrollTo(0,0);R[S[i][0]]()}
function next(){st.done[S[st.cur][0]]=1;go(Math.min(st.cur+1,6))}
const nb=(t="Lanjut")=>`<p><button class="btn" onclick="next()">${t}</button></p>`;
function quiz(id,title,intro,fb){const qs=Q[id].map(q=>{const o=sh(q[1].map((t,i)=>[t,i==q[2]]));return{q:q[0],o,e:q[3]}});let i=0,sc=0,sel=null,ans=false;
const draw=()=>{if(i>=qs.length){st.score[id]=sc;st.done[id]=1;nav();$("#app").innerHTML=`<h2>${title}</h2><div class="box"><div class="score">${sc*20}</div><p>Benar ${sc} dari ${qs.length} soal.</p>${id=="akhir"&&st.score.awal!=null?`<p>Nilai asesmen awal: <b>${st.score.awal*20}</b> → asesmen akhir: <b>${sc*20}</b>. ${sc>st.score.awal?"Pemahamanmu meningkat!":sc==st.score.awal?"Nilaimu stabil. Ulangi materi bagian yang masih ragu.":"Coba pelajari ulang materi pokok dan simulasi."}</p>`:""}</div>${nb()}`;return}
const q=qs[i];$("#app").innerHTML=`<h2>${title}</h2><p>${i==0?intro:""}</p><div class="box"><b>Soal ${i+1}/${qs.length}</b><p>${q.q}</p><div class="opts">${q.o.map((o,k)=>`<button data-k="${k}">${o[0]}</button>`).join("")}</div><div class="fb" id="fb"></div><button class="btn" id="go" disabled>${fb?"Periksa":"Simpan jawaban"}</button></div>`;
sel=null;ans=false;const bs=[...document.querySelectorAll(".opts button")];
bs.forEach(b=>b.onclick=()=>{if(ans)return;sel=+b.dataset.k;bs.forEach(x=>x.classList.remove("sel"));b.classList.add("sel");$("#go").disabled=false});
$("#go").onclick=()=>{if(!ans){ans=true;if(q.o[sel][1])sc++;if(fb){bs.forEach((x,k)=>x.classList.add(q.o[k][1]?"ok":(k==sel?"no":"")));$("#fb").innerHTML=(q.o[sel][1]?"✔ Benar. ":"✘ Belum tepat. ")+q.e}
if(fb){$("#go").textContent=i<qs.length-1?"Soal berikutnya":"Lihat nilai"}else{i++;draw()}}else{i++;draw()}}};draw()}
const R={apersepsi(){$("#app").innerHTML=`<h2>Apersepsi</h2><div class="box"><p>Kamu baru saja makan sepiring nasi. Beberapa jam kemudian, nasi itu tidak lagi terlihat seperti nasi, tetapi tubuhmu punya tenaga untuk belajar dan bermain.</p><p><b>Pertanyaan pemantik:</b> Ke mana perginya nasi itu? Organ apa saja yang dilaluinya?</p><textarea id="t" placeholder="Tulis dugaanmu di sini..."></textarea></div>
<div class="box"><p>Coba ingat: pernahkah kamu mengunyah nasi cukup lama sampai terasa manis?</p><button class="btn alt" onclick="this.nextElementSibling.hidden=false">Mengapa terasa manis?</button><p hidden>Enzim amilase dalam ludah mengubah pati nasi menjadi gula sederhana (maltosa). Itulah awal pencernaan, dan kamu akan menelusuri seluruh perjalanannya.</p></div>
<div class="box"><b>Tujuan pembelajaran</b><ul><li>Menyebutkan organ-organ pencernaan dan fungsinya.</li><li>Menjelaskan perjalanan makanan dan proses pencernaan di tiap organ.</li><li>Membedakan pencernaan mekanik dan kimiawi.</li></ul></div>${nb("Mulai asesmen awal")}`},
awal(){quiz("awal","Asesmen Awal","Jawab sesuai pengetahuanmu saat ini. Hasil tidak diberi tahu per soal; ini hanya untuk mengetahui titik awalmu.",false)},
materi(){let c=0;const d=()=>{$("#app").innerHTML=`<h2>Materi Pokok</h2><p>Pilih organ untuk mempelajari letak, fungsi, dan enzimnya.</p><div class="tabs">${O.map((o,i)=>`<button class="${i==c?'on':''}" data-i="${i}">${o[0]}</button>`).join("")}</div><div class="box"><h3>${O[c][0]}</h3><p>${O[c][1]}</p></div>
<div class="box"><b>Dua jenis pencernaan</b><table><tr><th>Mekanik</th><th>Kimiawi</th></tr><tr><td>Makanan dihancurkan secara fisik (mengunyah, meremas lambung)</td><td>Makanan diubah oleh enzim menjadi zat sederhana</td></tr></table></div>
<div class="box"><b>Ringkasan alur</b><p>Mulut → kerongkongan → lambung → usus halus → usus besar → rektum → anus. Hati, kantong empedu, dan pankreas adalah kelenjar pencernaan yang mengirim getahnya ke usus halus.</p></div>${nb("Coba simulasi")}`;document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{c=+b.dataset.i;d()})};d()},
simulasi(){const N=["Mulut","Kerongkongan","Lambung","Usus halus","Usus besar"];let f=null,k=-1;const d=()=>{$("#app").innerHTML=`<h2>Simulasi: Perjalanan Makanan</h2><p>Pilih makanan, lalu tekan <b>Dorong makanan</b> untuk melihat apa yang terjadi di tiap organ.</p><div class="tabs">${Object.keys(F).map(x=>`<button class="${x==f?'on':''}" data-f="${x}">${x}</button>`).join("")}</div>
<div class="tube">${N.map((n,i)=>`<div class="stage ${i==k?'on':i<k?'past':''}"><span class="dot"></span><div><b>${n}</b>${f&&i<=k?`<small>${F[f][i]}</small>`:""}</div></div>`).join("")}</div>
<p><button class="btn" id="p" ${f?"":"disabled"}>${k<0?"Dorong makanan":k<4?"Dorong ke organ berikutnya":"Ulangi"}</button></p>${k==4?`<div class="box">Selesai! Cobalah makanan lain dan bandingkan organ yang paling berperan.</div>${nb("Lanjut ke kuis")}`:""}`;
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{f=b.dataset.f;k=-1;d()});$("#p").onclick=()=>{k=k<4?k+1:-1;d()}};d()},
kuis(){quiz("kuis","Kuis","Jawab, lalu lihat umpan balik langsung untuk setiap soal.",true)},
akhir(){quiz("akhir","Asesmen Akhir","Ini penilaian akhirmu. Semoga hasilnya lebih baik dari asesmen awal.",false)},
refleksi(){$("#app").innerHTML=`<h2>Refleksi</h2><div class="box"><p>Beri tanda pada pernyataan yang benar untukmu:</p>${["Saya dapat menyebutkan organ pencernaan sesuai urutan.","Saya dapat menjelaskan fungsi tiap organ.","Saya paham perbedaan pencernaan mekanik dan kimiawi.","Saya dapat menjelaskan peran hati dan pankreas."].map(t=>`<label><input type="checkbox"> ${t}</label><br>`).join("")}</div>
<div class="box"><label>Bagian yang paling menarik bagiku:<textarea></textarea></label><br><br><label>Bagian yang masih sulit dan ingin kupelajari lagi:<textarea></textarea></label></div>
<div class="box"><b>Hasil belajarmu</b><p>Asesmen awal: ${st.score.awal!=null?st.score.awal*20:"belum dikerjakan"} · Kuis: ${st.score.kuis!=null?st.score.kuis*20:"belum dikerjakan"} · Asesmen akhir: ${st.score.akhir!=null?st.score.akhir*20:"belum dikerjakan"}</p><button class="btn alt" onclick="print()">Cetak refleksi</button></div>`;st.done.refleksi=1;nav()}};
go(0);
