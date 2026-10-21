# 守群 Runtime packing candidates v1

**執行契約審核材料；未安裝、未部署、未獲Runtime核准。**

正式提案：`docs/verification/M5C_P2_BOTUO_SPECIAL_PREFLIGHT.md`。原F3/poses/composite接受紀錄仍有效，不重問視覺Gate。

- `packing-manifest.json`：3個新asset候選、32個舊key的物理表示候選、來源SHA256、原logical descriptor、native frame/trim、RGBA反貼檢查。
- `botuo-specialPoses.png`：538×162，四張共同200×200邏輯canvas，root100/184、scale200/72、origin.5/.92、密度1；不是依packed外框fit。原400×320 review canvas以固定平移保留逐byte反貼證據。
- `botuo-specialActivation.png`／`botuo-specialState.png`：320×259／224×231物理範圍；原320×260／224×234 logical尺寸與display位置保留。
- `legacy/`：只刪原圖四通道全零空白的候選，沒有換正式public檔案、不重製P1/Basic/Heavy。P3/P4/P5已完成Move packs不在此變更集合。

從repo root執行`node docs/verification/P2_SPECIAL_PREFLIGHT/measure.mjs`，再`python docs/verification/P2_SPECIAL_PREFLIGHT/pack.py`，最後qa.py與residency.mjs。不覆寫approved、歷史review或public。

全部42個舊required仍在，加3個新key；候選45-key decoded16562336bytes，reserve131072，cap16777216，額外83808bytes。完整清單及兩種順序實測見`docs/verification/P2_SPECIAL_PREFLIGHT/{capacity,candidate-residency}.json`。真cache/residency guard，但decode/upload double；非GPU/browser/phone證據。

物理atlas無gutter、logical透明padding保留；需核准後做實際Phaser native-trim取樣與generic region-aware effect/body呈現。不能只換PNG、不更新logical-frame支持，也不能把離線RGBA相等聲稱為實際取樣無縫。沒有cap提高、required排除或密度降低。
