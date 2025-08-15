"use strict";

/**
 * A function containing everything to be used after the page loads
 */
const SCOPE = () =>
{
    
    //#region Initialization

    const MAIN_AREA = document.querySelector("main");
    const NAVIGATION_LIST_ELEMENT = document.querySelector("aside ul");

    //File paths
    const MEDIA_PATH = "media/";
    const IMG_PATH = MEDIA_PATH + "images/";
    const DOCUMENTS_PATH = MEDIA_PATH + "documents/";
    const AUDIO_PATH = MEDIA_PATH + "audio/";
    const MUSIC_PATH = AUDIO_PATH + "music/";
    const SFX_PATH = AUDIO_PATH + "sounds/";

    /**
     * @type {Entry[]}
     */
    const ENTRIES = [];

    /**
     * Initalization of anything that needs to be called at the beginning
     */
    const init = () =>
    {
        setupMobile();
        
        //Add entries
        createEntries(ENTRIES);
        populateContent(ENTRIES);
    };

    /**
     * Sets up functionality for mobile devices
     */
    const setupMobile = () =>
    {
        //Menu functionality
        document.querySelector("#hamburgerMenu").addEventListener("click", () => 
        {
            let sideBar = document.querySelector("aside");
            //Use datasets in the future, but for now resuing code from when i didnt know js
            if(sideBar.style.translate == "0%")
            {
                sideBar.style.translate = "-100%";
            }
            else
            {
                sideBar.style.translate = "0%";
            }
        });

        //Turn off menu when resized big enough and mobile not needed
        window.addEventListener("resize", () =>
        {
            let sideBar = document.querySelector("aside");
            if(window.innerWidth >= 1000)
            {
                sideBar.style.translate = "0%";
            }
            else
            {
                sideBar.style.translate = "-100%";
            }
        });
    }

    //#region Template
            // new Entry
            // (
            //     "name",
            //     "id",
            //     "short",
            //     "full",
            //     new ModuleImage(IMG_PATH + ".png", "alt"),
            //     new LinksGroup
            //     ([
            //         new ModuleLink
            //         (
            //             "https://",
            //             "label",
            //             new Tooltip("name", TOOLTIP_POSITION.UP)
            //         )
            //     ]),
            //     new Gallery
            //     ([
            //         new ModuleImage(IMG_PATH + ".png", "alt")
            //     ])
            // ),
    //#endregion

    /**
     * Creates all portfolio entries and adds them to the specified array
     * @param {Entry[]} entries the entries to add
     */
    const createEntries = entries =>
    {
        entries.push
        (
            new Entry
            (
                "Music",
                "generalMusic",
                "I have composed digital music since I was in middle school for fun. I often make ambient or experimental songs. I have experience in FL Studio and Soundtrap as my DAWs (Digital Audio Workstations). Here are some highlights:",
                null,
                null,
                new LinksGroup
                ([
                    new ModuleLink("https://rebufff.newgrounds.com/audio", "All of my songs", null)
                ]),
                null,
                new AudioGallery
                ([
                    new ModuleAudio(MUSIC_PATH + "white-space.mp3", "[Ambient] Whitespace"),
                    new ModuleAudio(MUSIC_PATH + "subnaupolis.mp3", "[Environmental] Subnaupolis"),
                    new ModuleAudio(MUSIC_PATH + "resurrections-cover.mp3", "[Video Game] Resurrections\nby Lena Raine (Cover)"),
                    new ModuleAudio(MUSIC_PATH + "low-light.mp3", "[Lo-fi] Low Light"),
                    new ModuleAudio(MUSIC_PATH + "hidden-clockwork.mp3", "[Experimental] Hidden Clockwork"),
                    new ModuleAudio(MUSIC_PATH + "anthem-of-the-lost.mp3", "[Build up] Anthem of the Lost"),
                    new ModuleAudio(MUSIC_PATH + "distant-glimmer.mp3", "[Rock kind of] Distant Glimmer")
                ]),
                ENTRY_SIZE.WIDE
            ),
            new Entry
            (
                "Chrono-Fling",
                "whitespace",
                "Originally called \"Whitespace\" this was created in C# and MonoGame during a 1 week game jam for an arcade machine. The theme was \"up\" and the game had the player manipulate time and fling themselves up to avoid the white wave from below.\n\nI created all the sfx, visuals, and code for this project.\n\nI re-made the game from the ground up using javascipt and pixi-js which is playable in the following link:",
                "full",
                new ModuleImage(IMG_PATH + "whitespace-logo.jpg", "Logo for the game"),
                new LinksGroup
                ([
                    new ModuleLink
                    (
                        "https://people.rit.edu/jmj2097/space/chrono-fling-old/",
                        "Chrono-Fling",
                        new Tooltip("Created for IGME-235 (Intro to Web Dev)")
                    )
                ]),
                new Gallery
                ([
                    new ModuleImage(IMG_PATH + "whitespace-gameplay.png", "gameplay of whitespace"),
                    new ModuleImage(IMG_PATH + "chrono-fling-web-gameplay.png", "gameplay of chrono-fling (web version)")
                ]),
                null,
                ENTRY_SIZE.STANDARD,
                "Whitespace"
            ),
            new Entry
            (
                "Anime Searcher",
                "animeSearcher",
                "This project used the Jikan API which scrapes MyAnimeList for information. It implemented several filtering systems and a quick way to see many anime at a glance.\n\nA cool thing I created was a system to create foldable containers (like fancy dropdown menus) using JavaScript and CSS.",
                "full",
                new ModuleImage(IMG_PATH + "anime-searcher.png", "anime searcher website"),
                new LinksGroup
                ([
                    new ModuleLink
                    (
                        "https://people.rit.edu/jmj2097/235/project2/",
                        "Anime Searcher",
                        new Tooltip("Created for IGME-235 (Intro to Web Dev)")
                    )
                ])
            ),
            new Entry
            (
                "Sound Effects",
                "generalSounds",
                "I have also created sounds for different projects for fun over the years. I usually make sounds through digital means. I know Audacity but prefer to use something like FL Studio because it has more flexability.\nOne way I do this is by find existing sounds that are free to use, combining them with other sounds, synths, and effects to create the desired sound.\nAnother way I make sounds is through completely synthetic means such as retro/\"8-bit\" sounds using programs such as BFXR. These are some sounds I have made:",
                null,
                null,
                new LinksGroup
                ([
                    new ModuleLink("https://www.youtube.com/watch?v=Snk45mkwEE0", "Realistic Sounds Video Showcase", new Tooltip("Made for IGME-119 (2D Asset Production)")),
                    new ModuleLink("https://people.rit.edu/jmj2097/space/chrono-fling-old/", "Retro Sounds Web Game", new Tooltip("Does not work on mobile"))
                ]),
                null,
                new AudioGallery
                ([
                    new ModuleAudio(SFX_PATH + "wastes/Walk01.wav", "Realistic sounds\n\nWalk on sand 1"),
                    new ModuleAudio(SFX_PATH + "wastes/Walk02.wav", "\n\nWalk on sand 2"),
                    new ModuleAudio(SFX_PATH + "wastes/LandOnEnemy.wav", "Smash shell goo creature"),
                    new ModuleAudio(SFX_PATH + "wastes/jump.wav", "Jump off sand"),
                    new ModuleAudio(SFX_PATH + "wastes/LandOnGround.wav", "Land on sand"),
                    new ModuleAudio(SFX_PATH + "wastes/Hurt.wav", "Player gets hit"),
                    new ModuleAudio(SFX_PATH + "whitespace/Time.wav", "Retro sounds\n\nSlow time"),
                    new ModuleAudio(SFX_PATH + "whitespace/Swipe.wav", "\n\nSwipe through menu"),
                    new ModuleAudio(SFX_PATH + "whitespace/Back.wav", "Bounce against wall"),
                    new ModuleAudio(SFX_PATH + "whitespace/Orb.wav", "Break powerup item"),
                    new ModuleAudio(SFX_PATH + "whitespace/Spike.wav", "Hit spike"),
                ]),
                ENTRY_SIZE.WIDE
            ),
            new Entry
            (
                "BuffScript",
                "buffscript",
                "In the side-scrolling game called Geometry Dash, I created my own programming syntax using objects called triggers which I called \"Buffscript\". I used these triggers to make my own system for writing code which could be used to make much more complicated and advanced procedures possible. I created a game utilizing this syntax which took about 2 months and the final result was very well received gaining over 200k downloads on this server and receiving the rating \"epic\" which is a very prestigious award to be given to a level.\n\n" +
                "I learned many different skills from the experience. The most important skill is problem solving. Because this is just an editor inside of a game, there are many severe limitations. Being able to solve problems and figure out creative solutions was almost a given if I wanted to make anything in it. The other skill I learned from it was how to make an engaging game. Using feedback I received on my first level that I had posted using my syntax, I created a game which was very well received gaining over 100k downloads called Little Light.\n\n" +
                "I am currently building a raycasting engine within the game",
                null,
                new ModuleImage(IMG_PATH + "little-light.png", "gameplay of a game I made called 'little light'"),
                new LinksGroup
                ([
                    new ModuleLink
                    (
                        "https://www.youtube.com/watch?v=V9vGlUOBcyc",
                        "Showcase Gameplay Video",
                        null
                    )
                ]),
                new Gallery
                ([
                    new ModuleImage(IMG_PATH + "little-light-triggers.png", "A section of the editor view"),
                    new ModuleImage(IMG_PATH + "raycast.png", "Raycasting demonstration")
                ]),
                null,
                ENTRY_SIZE.WIDE
            ),
            new Entry
            (
                "Railgun",
                "railgun",
                "Collaboratively programmed a top-down shooter in 3 months using C# and MonoGame with a team of 5. Railgun is a top down shooter where the player's health is used as ammo for their weapon.\n\nMy main job was creating the external map editor, but I also created many utilities and features for the game such as infinite procedural map stitching, tile mapping, map importing, a camera system, and music for the game.",
                "full",
                new ModuleImage(IMG_PATH + "railgun-gameplay.png", "gameplay of top-down shooter"),
                new LinksGroup
                ([
                    new ModuleLink
                    (
                        "https://www.youtube.com/watch?v=YFr7DTgfsSU",
                        "Editor Showcase Video",
                        new Tooltip("Created for IGME-106 (C# and MonoGame)")
                    ),
                    new ModuleLink
                    (
                        "https://www.youtube.com/watch?v=uu7SUsyqSbg",
                        "Gameplay Video",
                        new Tooltip("Created for IGME-106 (C# and MonoGame)")
                    )
                ]),
                new Gallery
                ([
                    new ModuleImage(IMG_PATH + "railgun-editor.png", "picture of railgun editor")
                ])
            )
        );
    };

    /**
     * Adds the specified entries to the page
     * @param {Entry[]} entries the entries to add
     */
    const populateContent = entries =>
    {
        for(const entry of entries)
        {
            MAIN_AREA.append(entry.generateHTML());
            NAVIGATION_LIST_ELEMENT.append(entry.generateNavigationHTML());
        }
    };

    //#endregion

    //#region Objects

    /**
     * An object that represents any portfolio module from which an HTML
     * element can be generated from
     */
    class Module
    {
        /**
         * Returns an HTML element of this module
         * @returns {HTMLElement} the generated element
         */
        generateHTML()
        {
            return new HTMLElement();
        }
    }

    /**
     * An object that contains useful information about an image such as alt text
     */
    class ModuleImage extends Module
    {
        /**
         * Creates a new image module
         * @param {string} src source path to image
         * @param {string} alt alt text to image
         */
        constructor(src, alt)
        {
            super();
            this.src = src;
            this.alt = alt;
        }

        /**
         * Returns the image element of this image
         * @returns {HTMLElement}
         */
        generateHTML()
        {
            return createElement("img", { src: this.src, alt: this.alt });
        }
    }

    /**
     * An "enum" representing the orientations of a tooltip
     * @readonly
     * @enum {string}
     */
    const TOOLTIP_POSITION =
        Object.freeze({ UP: "ttUp", DOWN: "ttDown", LEFT: "ttDown", RIGHT: "ttRight" });

    /**
     * An object representing a tool tipped element where something shows up upon hovering
     */
    class Tooltip extends Module
    {
        /**
         * Creates a new tooltip with the specified text and position
         * @param {string} text the text to be displayed by the tooltip
         * @param {TOOLTIP_POSITION} position the position which the tooltip
         * should be positioned
         */
        constructor(text, position = TOOLTIP_POSITION.DOWN)
        {
            super();
            this.text = text;
            this.position = position;
        }
    }

    /**
     * An object that contains useful information about a link
     */
    class ModuleLink extends Module
    {
        /**
         * Creates a new rich link
         * @param {string} href link adress
         * @param {string} text display text for link 
         * @param {Tooltip} tooltip tooltip to display when hovering over link
         */
        constructor(href, text, tooltip = null)
        {
            super();
            this.href = href;
            this.text = text;
            this.tooltip = tooltip;
        }

        /**
         * Returns a tool tipped element from this link
         * @returns {HTMLElement} generates the tool tipped element
         */
        generateHTML()
        {
            const linkHTML = createElement("div", {}, ["toolTipped", "entryLink"]);
            linkHTML.append(createElement("a", { href: this.href, innerText: this.text, target: "_blank"}));
            if(this.tooltip) linkHTML.append(createElement
            (
                "span",
                { innerText: this.tooltip.text }, 
                ["toolTip", this.tooltip.position]
            ));
            return linkHTML;
        }
    }

    class ModuleAudio extends Module
    {
        /**
         * Creates a new audio module
         * @param {string} src the path to the audio
         * @param {string} title the title of the audio
         */
        constructor(src, title)
        {
            super();
            this.src = src;
            this.title = title;

            //Determine file type
            this.type = this.getType(this.src);
        }

        /**
         * Returns the audio type to be used
         * @param {string} src path to audio file
         * @returns {string} the audio type of the specified audio file
         */
        getType(src)
        {
            //Isolate the audio extension
            let extension = src.substring(src.lastIndexOf("."));

            //Keep the extension as is unless mp3 (and change anything invalid to mpeg as well)
            switch (extension)
            {
                case "wav": break;
                case "ogg": break;
                default:
                    extension = "mpeg";
            }
            return "audio/" + extension;
        }

        generateHTML()
        {
            const audioElement = createElement("audio", { controls: true, innerText: "Your browser does not support the audio element." });
            audioElement.append(createElement("source", { src: this.src, type: this.type }));

            const wrapper = createElement("div");
            wrapper.append(createElement("p", { innerText: this.title }, ["entrySubHeader"]));
            wrapper.append(audioElement);

            return wrapper;
        }
    }

    /**
     * An object which contains multiple modules
     */
    class ModuleGroup extends Module
    {
        /**
         * Creates a new module group
         * @param {Module[]} modules an array of modules to be grouped
         */
        constructor(modules)
        {
            super();
            this.modules = modules;
        }

        /**
         * Returns all modules appended to a div
         * @returns {HTMLElement}
         */
        generateHTML()
        {
            const wrapper = createElement("div", {}, ["rowWrapGroup"]);
            for(const module of this.modules)
            {
                wrapper.append(module.generateHTML());
            }
            return wrapper;
        }
    }

    /**
     * An object that contains multiple links
     */
    class LinksGroup extends ModuleGroup
    {
        /**
         * Creates a new gallery
         * @param {ModuleLink[]} links the array of image modules
         */
        constructor(links)
        {
            super(links);
        }

        /**
         * Returns the HTML for this gallery
         * @returns {HTMLElement}
         */
        generateHTML()
        {
            return super.generateHTML();
        }
    }

    /**
     * An object that contains multiple images
     */
    class Gallery extends ModuleGroup
    {
        /**
         * Creates a new gallery
         * @param {ModuleImage[]} images the array of image modules
         */
        constructor(images)
        {
            super(images);
        }

        /**
         * Returns the HTML for this gallery
         * @returns {HTMLElement} the html element containing this gallery
         */
        generateHTML()
        {
            return super.generateHTML();
        }
    }

    /**
     * An object representing a group of audio files
     */
    class AudioGallery extends ModuleGroup
    {
        /**
         * Creates a new audio gallery
         * @param {ModuleAudio[]} audioModules array of audio modules
         */
        constructor(audioModules)
        {
            super(audioModules);
        }

        /**
         * Returns the HTML for this audio gallery
         * @returns {HTMLElement} the html element containing this audio group
         */
        generateHTML()
        {
            return super.generateHTML();
        }
    }

    /**
     * An "enum" representing the orientations of a tooltip
     * @readonly
     * @enum {string}
     */
    const ENTRY_SIZE =
        Object.freeze({ STANDARD: "entrySizeStandard", WIDE: "entrySizeWide"});

    /**
     * A container for portfolio entries
     */
    class Entry extends Module
    {
        /**
         * Creates a new entry with the specified parameters
         * @param {string} title title of entry
         * @param {string} id the html id that should be used for this entry
         * @param {ModuleImage} coverImage main image
         * @param {string} shortDescription brief summary of entry for minimized use
         * @param {string} fullDescription full description of entry
         * @param {LinksGroup} links array of strings containing external links to references
         * @param {Gallery} gallery gallery to be shown in full view
         * @param {AudioGallery} audioGallery audio gallery to be shown
         * @param {ENTRY_SIZE} size the size of the entry using the ENTRY_SIZE "enum"
         * @param {string} subtitle optional subtitle of entry
         */
        constructor(title, id, shortDescription, fullDescription, coverImage = null,
            links = null, gallery = null, audioGallery = null, size = ENTRY_SIZE.STANDARD, subtitle = null)
        {
            super();
            this.title = title;
            this.id = "entry-" + id;
            this.coverImage = coverImage;
            this.shortDescription = shortDescription;
            this.fullDescription = fullDescription;
            this.links = links;
            this.gallery = gallery;
            this.audioGallery = audioGallery;
            this.size = size;
            this.subtitle = subtitle;
        }

        /**
         * Returns the HTML for this entry
         * @returns {HTMLElement}
         */
        generateHTML()
        {
            const entryElement = createElement("article", { id: this.id }, [this.size]);

            entryElement.append
            (
                createElement("h3", { innerText: this.title }),
                createElement("h4", { innerText: this.subtitle }),
            );

            //If not null append
            if(this.coverImage) entryElement.append(createElement("img", { src: this.coverImage.src, alt: this.coverImage.alt }));
            entryElement.append(createElement("p", { innerText: this.shortDescription }));
            if(this.gallery) entryElement.append(this.gallery.generateHTML());
            if(this.audioGallery) entryElement.append(this.audioGallery.generateHTML());
            if(this.links) entryElement.append(this.links.generateHTML());

            return entryElement;
            //Create inside html for entry, chaining to make things easier
            // return createElement("article", { id: "entry-" + this.id })
            //     .chainAppend
            //     (
            //         createElement("h3", { innerText: this.title }),
            //         createElement("h4", { innerText: this.subtitle }),
            //         createElement("img", { src: this.coverImage.src, alt: this.coverImage.alt }),
            //         createElement("p", { innerText: this.shortDescription }),
            //         this.gallery.generateHTML(),
            //         this.links.generateHTML()
            //     );
        }

        /**
         * Generates the navigation button for each entry
         */
        generateNavigationHTML()
        {
            //The id with '#' used for query selecting
            const queryID = "#" + this.id;

            //Create and append elements
            const navigationListElement = createElement("li");
            const navigationLink = createElement("a", {href: queryID, innerText: this.title});
            navigationListElement.append(navigationLink);

            //Add highlight functionality
            navigationLink.addEventListener("click", () => 
            {
                let highlightElement = document.querySelector(queryID);
                if(highlightElement)
                {
                    highlightElement.style.borderColor = "#d3cf00";
                    setTimeout(() =>
                    {
                        highlightElement.style = "";
                    }, 500);
                }
            });
            
            //Return created element
            return navigationListElement;
        }
    }

    //#endregion

    //#region Element Extensions

    /**
     * Creates an element from the specified type and standard attributes. Non-standard attributes,
     * datasets, classes, etc need to be added outside
     * @param {string} elementType the type of element to create
     * @param {object} attributes an object that contains key value pairs of attributes.
     * Only works with standard attributes,
     * @param {Array} classes a list of classes to add if needed
     * @param {object} datasets a list of datasets to add if needed
     * @param {object} nonStandardAttributes a list of non-standard attributes to add if needed
     * @returns {HTMLElement} the created element
     */
    const createElement = (elementType, attributes,
        classes = [], datasets = {}, nonStandardAttributes = {}) =>
    {
        //Create the element from the specified type
        const element = document.createElement(elementType);
        
        //Add the attributes based on the object properties
        //Use bracket notation to access the property (weird)
        for(let attribute in attributes) element[attribute] = attributes[attribute];

        //Add classes
        for(let className of classes) element.classList.add(className);

        //Add datasets
        for(let dataName in datasets) element.dataset[dataName] = datasets[dataName];

        //Add nonstandards
        for(let attribute in nonStandardAttributes)
            element.setAttribute(attribute, nonStandardAttributes[attribute]);
        
        return element;
    }

    /**
     * Clears all inner html of the specified element
     * @param {HTMLElement} element element to clear
     */
    HTMLElement.prototype.clearElement = function() { this.innerHTML = ""; }

    //TODO
    /**
     * Appends the specified elements and returns itself allowing
     * for the chaining of append calls
     * @param  {...Node | string} nodes The nodes or strings to append
     * @returns This element
     */
    // HTMLElement.prototype.chainAppend = function(...nodes)
    // {
    //     this.append(nodes);
    //     return this;
    // }

    //#endregion

    //Call init when page loads and all functions and classes have been created
    init();
}

//Once the page loads, call function with everything in it
window.addEventListener("load", SCOPE);