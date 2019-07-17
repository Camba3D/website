'use strict';
/**
 * Wraper for get and set css variables
 */
let css = new class Css {
    constructor() { this.docstyle = getComputedStyle(document.documentElement); }
    get(propName) { return this.docstyle.getPropertyValue(propName) }
    set(propName, newValue) { document.documentElement.style.setProperty(propName, newValue); }
}();

/**
 * Local-Storage wrapper to allow JSON Objects
 */
let storage = new class Storage {
    constructor() { }
    get(key) {
        let value = localStorage.getItem(key);
        if (!value) { return; }
        if (value === '{}') { return false; }
        if (value[0] === '{') { value = JSON.parse(value); }
        return value;
    }
    set(key, value) {
        if (!key || !value) { return; }
        if (typeof value === 'object') { value = JSON.stringify(value); }
        localStorage.setItem(key, value);
    }
}();

/**
 * Compose a BS4 Card to
 * @param {string} iframe where the video is
 * @param {string} title title for the card
 * @param {string} desc card description
 * @param {string} link external link if exists
 * @param {string} tags tecnologies or similars, space separated
 */
function bsCard(ytID, title, desc, tags = '', link = '') {

    let _tags = tags.split(' ');
    let tagsDiv = document.createElement("div");
    tagsDiv.classList = "tags";
    for (const tag of _tags) {
        tagsDiv.appendChild($(`<span class="badge badge-secondary">${tag}</span>`)[0]);
    }
    let tagsStr = $(tagsDiv).prop("outerHTML");

    let linkStr = ''
    linkStr = (link !== '')
        ? `<a href="${link}" target="_blank"> <i class="fas fa-external-link-alt"></i> </a>`
        : '';

    return $(`
        <div class="card mx-auto mb-5">
            <div class="video embed-responsive embed-responsive-16by9">
                <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/${ytID}?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="card-body">
                <h5 class="card-title">${title}&nbsp;${linkStr}</h5>
                ${tagsStr}
                <p class="card-text">${desc}</p>
            </div>
        </div>`)[0];
}


//
// MAIN
//

(function () {
    // THEME

    let theme = storage.get('theme');
    if (!theme || theme === '') { theme = 'clear' };

    let themeSetup = function () {
        let btns = $('#themeBtn').children();
        if (theme === 'clear') {
            btns[0].removeAttribute('hidden');
            btns[1].setAttribute('hidden', true);
            $('.logo').attr('src', 'assets/logo_dark.png');
            css.set('--color', css.get('--color-dark'));
            css.set('--color-alt', css.get('--color-light'));
        } else {
            btns[0].setAttribute('hidden', true);
            btns[1].removeAttribute('hidden');
            $('.logo').attr('src', 'assets/logo_clear.png');
            css.set('--color', css.get('--color-light'));
            css.set('--color-alt', css.get('--color-dark'));
        }
        storage.set('theme', theme);
    }
    $('#themeBtn').on('click', function () {
        theme = (theme === 'dark') ? 'clear' : 'dark';
        themeSetup();
    });
    themeSetup();
    document.body.removeAttribute('hidden');


    // INJECT B4-CARDS

    let dr = document.querySelector('#demoReel');

    dr.appendChild(bsCard(
        'oZhsqQzcz48',
        'Interactive MOtion Graph',
        `<ul>
            <li>OpenGL own engine wrapped with C++ 17 to OOP pattern</li>
            <li>Parse OBJ files to create the 3D meshes with different shaders</li>
            <li>Parse BVH files to get animations data</li>
            <li>Process rotations of skeleton joints to play an animation</li>
            <li>Composition of motion graph with animations parsed from BVHs</li>
            <li>Interpolate animations to create transitions between graph nodes</li>
        </ul>
        `,
        'C++ Modern-Opengl FromScratch Blender',
        'https://github.com/cambalamas/imog')
    );
    dr.appendChild(bsCard(
        '2Z41U9yh7K0',
        'A game about paint people, because yes',
        '(First Unity game that I\'ve made) All objects modeled and rigged on 3DMax, not a great artist, but the game has difficult levels and it\'s fun for a break',
        'Unity C# FromScratch 3DMax HandMade-Assets',
        'https://cambalamas.itch.io/dont-paint-me')
    );
    dr.appendChild(bsCard(
        'XWu2WUpjcoI',
        'Catched #MadeWithUnity',
        'Decision tree based AI with safe areas, targets and power-ups',
        'Unity C# FromScratch HandMade-Assets DecisionTree-AI',
        'https://gitlab.com/cambalamas/Catch_ed')
    );
    dr.appendChild(bsCard(
        'zk0RkSM18Fk',
        'Grimoire #MadeWithUnity',
        'Hack and slash game making our best to follow game feel patterns and a great exercise to improve team work skills (See full video on link)',
        'Unity C# FromScratch Enemy-AI-System',
        'https://youtu.be/kXoXojyb1KQ')
    );
    dr.appendChild(bsCard(
        'kSXYslrRbvY',
        'Handmade cloth simulation with Unity',
        'Physics made from scratch to simulate cloth and its interaction with a mouse-managed gravity',
        'Unity C# Physics-FromScratch')
    );
    dr.appendChild(bsCard(
        'IwkHQ_bOhfE',
        'Procedural terrain with dynamic tessellation',
        `<ul>
            <li>Octaves and elevation control</li>
            <li>Camera control: mouse & keyboard</li>
            <li>LOD based on camera distance</li>
        </ul> `,
        'C++ Modern-OpenGL GLSL FromScratch')
    );
    dr.appendChild(bsCard(
        'scc9yg8-pU8',
        'Convolution filters Modern OpenGL',
        'Low-Level graphics api shaders and setup for apply conv filters on 3D meshes using Deferred Shading',
        'C++ Modern-OpenGL GLSL',
        'https://gitlab.com/cambalamas/openGL_and_glsl')
    );
    dr.appendChild(bsCard(
        '3ADj3hj1kR0',
        '2D IK',
        'Inverse kinematic on 2D skeleton',
        'Matlab')
    );
    dr.appendChild(bsCard(
        'qEVfovJ2z2s',
        'Use of Unity\'s animation mask system',
        'Masking upper-body of <i>run</i> animation and lower-body of <i>attack</i> animation',
        'Unity C# Mecanim-Humanoid')
    );
    dr.appendChild(bsCard(
        'ICD4tvXNdaE',
        'VR Off-Axis tracking interaction',
        'VR context application of off-axis perspective projection',
        'C++ Chai3D')
    );
    dr.appendChild(bsCard(
        'vnnRPrnEVkE',
        'Prototypist - GUI tool for the design of simple components and states for the static definition of a graphical user interface',
        'Research of graphical interface development tools for desktop environments, in order to carry out an implementation that covers the specification of a component-based interface. These components have some attributes and can be grouped in a static or dynamic way. In the project, its static grouping was developed, but proposed in such a way that it serves as base for a future develop towards dynamic behaviours',
        'Python PyQT5 FromScratch')
    );
    dr.appendChild(bsCard(
        'dIHax1Nmo8I',
        'Naive water shader',
        'Simulate water waves mixing two perlin noises on my own engine',
        'C++ Modern-OpenGL GLSL FromScratch')
    );
    dr.appendChild(bsCard(
        'z7ZDNZHLlF4',
        'Playing with geometric shaders',
        'Explode effect pushing quads in the direction of normals using OpenGL and C++',
        'C++ Modern-OpenGL GLSL')
    );
})()
