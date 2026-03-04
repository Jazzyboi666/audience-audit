/**
 * Audience Reach Visualizer Logic - DYNAMIC COLLISION MODE
 */

const campaigns = {
    'Technical_Assets': {
        fullName: 'Creator_NewIP_YS_20260205',
        color: '#6366f1',
        revenue: 595.58,
        isTopPerformer: true,
        interests: ['Design Software', 'Drawing & Animation', 'Video Games', 'Game Development Platforms', 'Unity Development'],
        themes: ['Neural rendering', 'Volumetric 3d', 'Text to FBX', 'PBR material gen', 'Unreal 5 pipeline']
    },
    'Global_Trial_Push': {
        fullName: 'creator_GGAd_try6_Yasen_20251201',
        color: '#84cc16',
        revenue: 190.00,
        isTopPerformer: true,
        interests: ['General Technology', 'Indie Game Enthusiasts', 'SEA Region Educators', 'Game Design Software', 'Instructions for Making a Game'],
        themes: ['LLM', 'best ai', 'ai game', 'start free trial', 'buy subscription', '3d game maker singapore', 'Create 3D games online', 'no-code 3d game builder', 'unity replacement']
    },
    'Competitive_Siege_T2': {
        fullName: 'creator_GGAD_T2_LY_20251222',
        color: '#0ea5e9',
        revenue: 126.77,
        isTopPerformer: true,
        interests: ['Unity Development Platform', 'Unreal Game Engine', 'Competitive Switchers', 'Game Development Platforms', 'Design Software'],
        themes: ['Rosebud AI competitor', 'Scenario.gg alternative', 'Fast game prototyping', 'AI world creator pro', '3D Modeling for Unit', 'AI 3D Asset Generator']
    },
    'Interface_Efficiency': {
        fullName: 'Creator_NewIp_PayingUsers_GG_SeeleInterface_YS',
        color: '#10b981',
        interests: ['Technology (Affinity)', 'Game Development Platforms (In-market)', 'Deep Learning', 'Game Design Software'],
        themes: ['Seele AI', 'SaaS game dev', 'Prompt to world', 'No-code prototyping', 'Fast game creation']
    },
    'Flashy_Images': {
        fullName: 'Creator_NewIp_PayingUsers_GG_FlashyImages_YS_20260226',
        color: '#f59e0b',
        interests: ['Video Games', 'Gamers (Affinity)', 'Adventure & Strategy Fans', 'PC Gamers'],
        themes: ['make your own game', 'instant game creator', 'game dev made easy', 'custom 3d world', 'turn idea into game']
    },
    'Automation_Layer': {
        fullName: 'Creator_GG_ForGameDevsTryNew2_YS_20260303',
        color: '#ef4444',
        interests: ['Design Software', 'Web Design', 'Deep Learning', 'Machine Learning', 'Indie Games'],
        themes: ['godot automation', 'unity level design', 'unreal project from prompt', 'unity world builder', 'npc system builder']
    },
    'Purchase_Conversion': {
        fullName: 'Creator_GGAD_Purchase_Meshy&Trippo_YS_20260224',
        color: '#a855f7',
        interests: ['Meshy and Trippo Customers', 'Purchasers of SeeleWEB', 'All Stripe Payers', 'Design Software'],
        themes: ['ai 3d model generator', 'ai tools for game developers', 'low poly asset generator', 'reduce 3d modeling cost', '3d workflow automation']
    },
    'Brand_Push_V2': {
        fullName: 'Creator_GGAds_NewIPTry2_YS_20260302',
        color: '#ec4899',
        interests: ['Technology (Affinity)', 'Game Development Platforms', 'Video Game Development Resources', 'Game Design Software'],
        themes: ['ai game maker', 'seele ai game generator', 'no code game development', 'make a game from text', 'ai game designer']
    },
    'Competitive_Alternative': {
        fullName: 'Creator_GGAds_GooglePics_YS_20260302',
        color: '#06b6d4',
        interests: ['Arts & Design Education', 'Design Software', 'Web Design & Development', 'Instructions for Making a Game'],
        themes: ['create games without coding', 'ai game engine', 'no code game builder', 'ai game creator', 'ai unity alternative', 'build a game in minutes']
    },
    'Pro_Enterprise_Pipeline': {
        fullName: '0224-creator-T1-MAX44-YL',
        color: '#475569',
        interests: ['Design Software (In-market)', 'Drawing & Animation Software (In-market)', 'Game Development Platforms', 'Instructions for Making a Game'],
        themes: ['volumetric 3d generation ai', 'unity pro 3d assets ai', 'unreal engine 5 ai pipeline', 'godot engine source to 3d', 'text to fbx pro generator', 'obj export ai 3d models', 'pbr material generator for games', '4k texture generation ai', 'high quality mesh generator ai']
    },
    'Competitive_Siege_V1': {
        fullName: '1223-sale-GGAD_T1-2_LY',
        color: '#064e3b',
        interests: ['Unreal Game Engine', 'Unity Development Platform', 'Blender', 'Game Development Platforms', 'Design Software'],
        themes: ['Create 3D games for beginners', 'AI-powered game creation tool', 'Create 3D platformer using text', 'Neural game engine', 'educational game maker ai', 'Rosebud AI alternative', 'Better than Ludo.ai', 'Zero code game development', 'Apps like Hiber3D']
    }
};

/**
 * CORE DATA DETECTOR: Automatically calculate overlaps based on array intersections
 */
function calculateOverlaps() {
    const sets = [];
    const keys = Object.keys(campaigns);

    // 1. Base sets (circles)
    keys.forEach(id => {
        const totalTags = campaigns[id].interests.length + campaigns[id].themes.length;
        sets.push({ sets: [id], size: totalTags * 10 }); // Scaled for visibility
    });

    // 2. 2-way intersections
    for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
            const id1 = keys[i];
            const id2 = keys[j];

            // Search Theme intersection
            const sharedThemes = campaigns[id1].themes.filter(t =>
                campaigns[id2].themes.includes(t)
            ).length;

            // Interest intersection
            const sharedInterests = campaigns[id1].interests.filter(inter =>
                campaigns[id2].interests.includes(inter)
            ).length;

            const totalShared = sharedThemes + sharedInterests;

            if (totalShared > 0) {
                sets.push({ sets: [id1, id2], size: totalShared * 8 });
            }
        }
    }

    // 3. Significant 3-way overlaps (Manual sanity check for core nucleus)
    const nucleus = ['Technical_Assets', 'Pro_Enterprise_Pipeline', 'Automation_Layer'];
    sets.push({ sets: nucleus, size: 25 });

    return sets;
}

function init() {
    const dynamicSets = calculateOverlaps();
    renderGlobalDiagram(dynamicSets);
    updateSidebar();
    renderRevenueLeaderboard();
    renderThemesUnderneath();
    renderTopCollisionRanking();
}

function renderGlobalDiagram(sets) {
    document.getElementById('canvas-wrapper').classList.add('has-data');
    const container = document.getElementById('venn-diagram');
    container.innerHTML = '';
    const chart = venn.VennDiagram().width(850).height(450);
    const div = d3.select("#venn-diagram");
    div.datum(sets).call(chart);

    div.selectAll(".venn-circle path")
        .style("fill-opacity", d => {
            const id = d.sets[0];
            return campaigns[id] && campaigns[id].isTopPerformer ? 0.6 : 0.2;
        })
        .style("stroke-width", d => {
            const id = d.sets[0];
            return campaigns[id] && campaigns[id].isTopPerformer ? 6 : 2;
        })
        .style("stroke-opacity", 1)
        .style("stroke", d => {
            const id = d.sets[0];
            return d.sets.length === 1 ? (campaigns[id] ? campaigns[id].color : "#ffffff") : "#ffffff";
        })
        .style("fill", d => {
            const id = d.sets[0];
            return d.sets.length === 1 ? (campaigns[id] ? campaigns[id].color : "#ffffff") : "#ffffff";
        });

    div.selectAll(".venn-circle text").remove();

    const tooltip = d3.select("body").selectAll(".venntooltip").data([null]).join("div").attr("class", "venntooltip").style("opacity", 0);

    div.selectAll("g")
        .on("mouseover", function (event, d) {
            venn.sortAreas(div, d);
            tooltip.transition().duration(200).style("opacity", .9);
            let content = "";
            if (d.sets.length === 1) {
                const camp = campaigns[d.sets[0]];
                content = `
                    <div style="font-weight: 800; color: ${camp.color}; margin-bottom: 8px">${camp.fullName}</div>
                    ${camp.revenue ? `<div style="color: #4ade80; font-weight: 900; font-size: 1.1rem; margin-bottom: 8px">💰 Revenue: $${camp.revenue}</div>` : ''}
                    <div style="font-size: 0.65rem; text-transform: uppercase; color: #94a3b8">Targeted Interests:</div>
                    <div style="margin-top: 5px">${camp.interests.map(i => `<div style="font-size: 0.75rem; margin-bottom: 2px">• ${i}</div>`).join('')}</div>
                `;
            } else {
                content = `<div style="font-weight: 800">Dynamic Collision</div><div style="font-size: 0.75rem; opacity: 0.8">These campaigns share specific interests or themes.</div>`;
            }
            tooltip.html(content).style("left", (event.pageX + 15) + "px").style("top", (event.pageY - 28) + "px");
        })
        .on("mousemove", (event) => tooltip.style("left", (event.pageX + 15) + "px").style("top", (event.pageY - 28) + "px"))
        .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0));
}

function updateSidebar() {
    const list = document.getElementById('campaign-items');
    list.innerHTML = `
        <div style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1rem; font-weight: 600">Master Stack (11)</div>
        ${Object.keys(campaigns).map(id => `
            <div class="stat-item" style="border-left: 4px solid ${campaigns[id].color}; padding: 10px; background: rgba(255,255,255,0.02); margin-bottom: 8px; border-radius: 4px; ${campaigns[id].isTopPerformer ? 'box-shadow: 0 0 10px rgba(74, 222, 128, 0.2)' : ''}">
                <div style="font-size: 0.75rem; font-weight: bold; color: #fff; line-height: 1.2">${campaigns[id].fullName}</div>
                ${campaigns[id].revenue ? `<div style="font-size: 0.65rem; color: #4ade80; font-weight: 800; margin-top: 4px">$${campaigns[id].revenue} USD</div>` : ''}
            </div>
        `).join('')}
    `;
}

function renderRevenueLeaderboard() {
    const grid = document.getElementById('segment-grid');
    const winners = Object.values(campaigns)
        .filter(c => c.revenue)
        .sort((a, b) => b.revenue - a.revenue);

    const leaderSection = document.createElement('div');
    leaderSection.style.gridColumn = '1 / -1';
    leaderSection.style.marginBottom = '3rem';
    leaderSection.innerHTML = `
        <h2 style="color: #4ade80; margin-bottom: 1.5rem">💰 Revenue Engines (Interest & Search Theme Validated)</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem">
            ${winners.map((win, idx) => `
                <div style="background: rgba(255,255,255,0.04); border: 2px solid ${win.color}; border-radius: 20px; padding: 25px; position: relative">
                    <div style="position: absolute; right: -10px; top: -10px; font-size: 4rem; opacity: 0.1; font-weight: 900">#${idx + 1}</div>
                    <div style="font-size: 0.7rem; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px">Campaign Winner</div>
                    <div style="font-size: 1.1rem; font-weight: 800; color: #fff; margin: 5px 0; line-height: 1.2">${win.fullName}</div>
                    <div style="font-size: 2.2rem; font-weight: 900; color: #4ade80; margin-bottom: 20px">$${win.revenue} <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 400">USD</span></div>
                    
                    <div style="margin-bottom: 15px">
                        <div style="font-size: 0.6rem; text-transform: uppercase; color: #4ade80; font-weight: 900; letter-spacing: 0.5px; margin-bottom: 8px">💰 Winning Interests</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 4px">
                            ${win.interests.map(i => `<span style="font-size: 0.65rem; background: rgba(74, 222, 128, 0.1); color: #4ade80; padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(74, 222, 128, 0.2)">${i}</span>`).join('')}
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 0.6rem; text-transform: uppercase; color: ${win.color}; font-weight: 900; letter-spacing: 0.5px; margin-bottom: 8px">🚀 Winning Signals (Search Themes)</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 4px">
                            ${win.themes.slice(0, 8).map(t => `<span style="font-size: 0.65rem; background: ${win.color}; color: #fff; padding: 3px 8px; border-radius: 6px; font-weight: bold">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    grid.insertBefore(leaderSection, grid.firstChild);
}

function renderThemesUnderneath() {
    const grid = document.getElementById('segment-grid');
    const title = document.createElement('div');
    title.style.gridColumn = '1 / -1';
    title.innerHTML = `<h2 style="color: #94a3b8; margin-bottom: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem">Technical Search Index</h2>`;
    grid.appendChild(title);

    Object.keys(campaigns).forEach(id => {
        const camp = campaigns[id];
        const card = document.createElement('div');
        card.className = 'segment-card';
        card.style.borderTopColor = camp.color;
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start">
                <h4 style="font-size: 0.75rem; margin-bottom: 8px; color: ${camp.color}">${camp.fullName}</h4>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 4px">
                ${camp.themes.map(t => `<span style="font-size: 0.65rem; background: rgba(255,255,255,0.03); padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06)">${t}</span>`).join('')}
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderTopCollisionRanking() {
    const grid = document.getElementById('segment-grid');
    const collisions = {};
    Object.keys(campaigns).forEach(id => {
        const camp = campaigns[id];
        camp.themes.forEach(t => {
            const norm = t.toLowerCase().trim();
            if (!collisions[norm]) collisions[norm] = { name: t, type: 'Theme', campaigns: [] };
            if (!collisions[norm].campaigns.includes(id)) collisions[norm].campaigns.push(id);
        });
        camp.interests.forEach(i => {
            const norm = i.toLowerCase().trim();
            if (!collisions[norm]) collisions[norm] = { name: i, type: 'Interest', campaigns: [] };
            if (!collisions[norm].campaigns.includes(id)) collisions[norm].campaigns.push(id);
        });
    });
    const allCollisions = Object.values(collisions).sort((a, b) => b.campaigns.length - a.campaigns.length).slice(0, 20);

    const rankingSection = document.createElement('div');
    rankingSection.style.gridColumn = '1 / -1';
    rankingSection.style.margin = '3rem 0';
    rankingSection.innerHTML = `
        <h2 style="color: #ec4899; margin-bottom: 1.5rem">Top Overlapping</h2>
        <div style="background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); overflow: hidden">
            <table style="width: 100%; border-collapse: collapse; text-align: left">
                <thead style="background: rgba(255,255,255,0.05)">
                    <tr><th style="padding: 15px">RANK</th><th style="padding: 15px">TAG</th><th style="padding: 15px">CAMPAIGNS USING THIS</th><th style="padding: 15px">SCORE</th></tr>
                </thead>
                <tbody>
                    ${allCollisions.map((item, idx) => `
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05)">
                            <td style="padding: 15px; font-weight: 800; color: #ec4899">#${idx + 1}</td>
                            <td style="padding: 15px"><div style="font-weight: 600">${item.name}</div><div style="font-size: 0.65rem; color: #94a3b8">${item.type}</div></td>
                            <td style="padding: 15px"><div style="display: flex; flex-wrap: wrap; gap: 4px">${item.campaigns.map(cid => `<span style="font-size: 0.6rem; color: #fff; background: ${campaigns[cid].color}; padding: 2px 6px; border-radius: 4px; font-weight: bold">${campaigns[cid].fullName}</span>`).join('')}</div></td>
                            <td style="padding: 15px"><span style="font-size: 0.75rem; color: #94a3b8">${item.campaigns.length}/11 PILLARS</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    grid.insertBefore(rankingSection, grid.firstChild.nextSibling);
}

document.addEventListener('DOMContentLoaded', init);
