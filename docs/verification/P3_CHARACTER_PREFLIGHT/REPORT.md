# 赤鱬整角色前檢／規格準備

基線56c6e3f9454c4394d82dbaeda2f101d69f4973c4/treeb1526792f34997c55d1c6c6035a8de0855fa78ea；fetch一致，PR#1open/unmerged，初始working tree乾淨。玩家已選整角色規格/整包素材/一次發布流程並授權記錄後繼續P3規格；流程收據CHARACTER_BATCH_WORKFLOW/acceptance.json，非新數值核准。

讀取catalog/abilities/tierEffects/tierScalingProfiles、tierProjection/條件modifier、battleSession真傷害/治療、effectTargeting、passiveDefinition/Runtime與Collection。實際檢視既有chiru identity與battleIdle，保留紅白鰭片/青色水珠/懸浮尺度/canonical右向與mirror；Move/KO依既有核准來源沿用，不因舊PHONE PENDING重開。

probe.mjs實際建32個既有headless Session（四Tier×instant/tactical×四招），使用真damage/executeAbility/step，正傷害/正治療、Heavy延遲對比與P3.passive仍implemented:false均PASS，完整結果baseline.json與來源SHA保存。初次probe直接寫hp唯讀getter失敗，改用既有damage介面後PASS，未為probe修改產品。這是新P3前檢，不是Browser/新設計實作驗證，也沒重跑P1/P2舊suite。

主要發現：治療現用受益者T0 maxHP×施法者healing scale，與當前生命上限百分比介紹不一致；T2後排modifier與獨立被動同名；P3 Heavy instant0與tactical700ms存在差異；T3護群於cast即發生；共用被動尚不支援條件instant-heal。完整spec明示新百分比/延遲時間線/保護時點/同名區分/共用擴充，而不假稱只需填資料。新機制全部DESIGN PENDING。

交付：docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md與proposal.json含五招/四Tier/條件/時間/CD/素材/真受益者VFX/Collection/清理/共存/必要驗證與發布範圍；全未來角色模板docs/templates/CHARACTER_SPEC_TEMPLATE.md。原生單人builder自審，非獨立review；玩家數值/時序/美術審核未發生，不生成F3/GIF、不寫Runtime、不部署。

來源未變guard585靜態PASS；既有1070/Build/Browser/Pages39902216798與公開149證據沿用，不重跑。下一Gate：整張角色規格玩家審閱；通過後寫整包實作計畫並按整包F3/樣式、GIF、實作/必要驗證、一次正常發布與整角玩家驗收推進。所有進度/規則/handoff同分支[skip ci]保存，沒有外部DB/依賴或產品來源修改。
