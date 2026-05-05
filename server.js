const express = require('express');
const si = require('systeminformation');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/stats', async (req, res) => {
    try {
        const [cpu, mem, fs, time] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.fsSize(),
            si.time()
        ]);

        res.json({
            cpu: cpu.currentLoad,
            ram: {
                used: (mem.active / 1024 / 1024 / 1024),
                total: (mem.total / 1024 / 1024 / 1024),
                percent: (mem.active / mem.total) * 100
            },
            disk: {
                percent: fs[0].use
            },
            uptime: `${Math.floor(time.uptime / 3600)}h ${Math.floor((time.uptime % 3600) / 60)}m`
        });
    } catch (error) {
        res.status(500).json({ error: "Data error" });
    }
});

app.listen(PORT, () => console.log(`Monitor dashboard di http://localhost:${PORT}`));