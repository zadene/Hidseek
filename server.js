io.on('connection', (socket) => {
    console.log('Pemain terhubung:', socket.id);

    socket.on('masuk_lobby', (namaPemain) => {
        pemainLobby.push({ id: socket.id, nama: namaPemain });
        io.emit('update_lobby', pemainLobby);
    });

    // --- KODE BARU UNTUK CHAT ---
    // Server menerima pesan dari satu pemain, lalu menyebarkannya ke semua pemain
    socket.on('kirim_pesan', (dataPesan) => {
        io.emit('terima_pesan', dataPesan);
    });
    // ----------------------------

    socket.on('disconnect', () => {
        pemainLobby = pemainLobby.filter(pemain => pemain.id !== socket.id);
        io.emit('update_lobby', pemainLobby);
    });
});
