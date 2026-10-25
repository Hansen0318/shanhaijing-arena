```text
【山海經聯盟｜IMG_2864真正退示意已部署；只接玩家遊戲驗收／實際新回饋】
所有後續交接指令維持單一完整、自足、可一鍵複製的code block。

[GitHub恢復與保護]
接續 Hansen0318/shanhaijing-arena。最新remote唯一權威；唯一分支feat/m0-combat-core-20260927，PR#1 open/unmerged，禁止merge main。發布來源d346798cadf12efeada0f11e15f72c62a4d78eb6只是定位，之後純證據文件有新commit；先fetch最新HEAD，核對本機未push/tree，不用定位SHA覆蓋新成果。原生單人、不委派、不新branch/worktree、不動TD、不重置存檔、不動無關untracked。
先讀最新AGENTS.md、WORK_PROGRESS.md與docs/STATE.md頂端、DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、CHARACTER_ACTION_ART_WORKFLOW、M5C_ART_ANIMATION_VFX、docs/decisions/2026-10-23-restore-sequential-skill-workflow.md與2026-10-25-retire-schematic-under-formal-actions.md、docs/verification/SCHEMATIC_RETIREMENT/{REPORT.md,release.json,WORK_LOG.md,source-guards.json,ci-local-build.json,public-fingerprints.json,protected-sources.json,publish-method.json}、docs/verification/P3_PASSIVE_RUNTIME/CURRENT.json。

[已完成與實證，不重做]
發布產品d346798／tree aa874382636b8bda2bea0d803c7d367d37254ac7；正常Pages40163995446/build121081184936/deploy121083539138 SUCCESS。獨立P1 40163995418、P2 40163995443 SUCCESS。
完整1229/1229、Build110素材/6378266 bytes PASS。新native96/built96真正WebGL檢查：正式action真貼圖完整載入時新增示意paintedPixels=0、commandBuffer等於clear；刻意移除真水浪貼圖才恢復fallback，恢復後退fallback。真tactical Session Heavy蓄勢150ms/飛行500ms/命中705ms/收招1100ms各有native/built共8張未改圖：真threat在飛行階段保留、正式heavyColumn可見、同幀geometry=0，命中後heavyImpact與真damage存在。圖在evidence/passive/browser/；是隔離工程場景（其他技能CD99防干擾），不是手機玩家核准。
游息32/4、20招真execute/載入/可見/無雙疊/清理native+built、四主動各32/4、P1 16/8、P2 4/2均PASS。4artifact SHA256/ZIP CRC及隔離源guard657/692/589 PASS；CI/local172檔逐bytes/SHA256相符；公開3個實際變更檔fresh＋169相同path/bytes/hash綁定前次fresh公開/CI proof沿用，共172 PASS。不能冒稱本次172全fresh。原收據/舊證據未覆寫。
來源未變，不重跑suite/Build/Browser/Pages/public；不要重生已核准PNG/GIF、重做這次程式或另啟動下一角色。

[最新玩家回報與正確規則]
IMG_2864玩家：「妳沒有改…赤鱬…還是有示意圖…好像是heavy…確認後直接改正」。前38cdd8c的ground-sigil膠囊/箭頭/方塊只是換皮示意，仍疊在正式水浪下；舊「96案有畫出幾何」PASS不是退示意，也未被玩家核准。那套未核准向量來源/註冊/程式已撤掉，編譯包沒有ground-sigil/warningDescriptors，不得恢復。
新共用characterActionAssetKeys列出正式動作及全部effect/status貼圖，與prepare同清單；AssetPresenter.formalActionSource驗證descriptor成功解析、所有圖片實際載入且TextureManager存在，才讓TelegraphPresenter撤同record整層示意。不是只看角色ID、asset名、descriptor存在或新畫的幾何renderer。Arena按sourceId→真definition/category共用解析，無P3特例。正式本體/蓄勢/飛行/命中圖片承接技能視覺，不再另畫精確範圍框/箭頭/方塊。缺真來源才一份fallback，並保持原真threat ledger、範圍、時序、命中/治療/傷害數值。
未開發P4/P5 action與獨立持續場域各有必要fallback；P1/P2正式被動、P2盾、P3水膜及固定褐色場地輔助不是本招示意，不誤刪。全部approved PNG/收據/本體尺度/anchor/懸浮下緣/右canonical左mirror、四主動與游息契約保持；普通Hit永久取消、無固定16MiB總額但逐檔安全/兩下載/required/所有權回收仍必須。Collection只寫實際玩法。

[唯一下一Gate]
呈交已部署 https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&vfx=d346798 。玩家橫向進戰鬥後選赤鱬→H，看正式水浪下的膠囊/箭頭/方塊已退出；游息亮邊/雙魚可沿HEAL TEST/T3觀察。等待明確玩家遊戲核准或實際新回饋。P1/P2與P3四主動既有核准保持；這次工程/部署完成不是新Runtime玩家核准。P3未COMPLETE，不建未核准acceptance、不開始下一角色。收到玩家核准才保存綁定實際發布/原收據hash的Runtime acceptance及依逐招規則做P3結案；有新回饋只修該回饋，不預先重驗舊成果。
游息不可變：caster存活可行動未受控、有活敵且最近敵距≥2.0；4.2內存活同隊含自身HP≤60%，最低HP/maxHp/同值穩定instanceId，一次一人、當前maxHp×8/12/16/20%缺血封頂，正amount才各instance獨立8秒CD，不吃主動scale/modifier/復活/暴擊/循環。同刻傷害KO→主動→重新檢查被動。零治療無魚印；已結算不回滾，650ms/KO/end/Restart/destroy清理。

[保存與節省重複工作]
每次繼續先fetch最新規則/進度。原生單人同分支、PR1保持open/unmerged。純收據/證據文件[skip ci]，來源未變不重跑；需要新工程才做針對性RED→GREEN及真受影響驗證。CLI無認證時用connected GitHub API逐blob Git SHA/完整tree核對、expected-SHA非force更新ref。所有交接指令單一完整自足code block。
```
