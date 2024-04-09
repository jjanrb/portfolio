"use strict";

/**
 * A function containing everything to be used after the page loads
 */
const SCOPE = () =>
{
    
    //#region Initialization

    const MAIN_AREA = document.querySelector("main");

    /**
     * Initalization of anything that needs to be called at the beginning
     */
    const init = () =>
    {
        const testEntry = new Entry
        (
            "Test",
            "tid",
            "short",
            "full",
            "subtitle",
            new ModuleImage("media/logo.png", "alttext"),
            new Gallery
            ([
                new ModuleImage("media/little-light.png", "alt1"),
                new ModuleImage("media/little-light.png", "alt2")
            ]),
            new AudioGallery
            ([
                new ModuleAudio("media/audio/music/Porter (2).mp3"),
                new ModuleAudio("media/audio/music/Porter (2).mp3")
            ]),
            new LinksGroup
            ([
                new ModuleLink
                (
                    "https://people.rit.edu/jmj2097/235/tetris-grid/tetris-grid.html",
                    "aaa",
                    new Tooltip("tool", TOOLTIP_POSITION.UP)
                )
            ])
        );
        MAIN_AREA.append(testEntry.generateHTML());
        
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
        constructor(text, position)
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
            const linkHTML = createElement("div", {}, ["toolTipped"]);
            linkHTML.append
            (
                createElement("a", { href: this.href, innerText: this.text }),
                createElement("span", { innerText: this.tooltip.text }, 
                    ["toolTip", this.tooltip.position])
            );
            return linkHTML;
        }
    }

    class ModuleAudio extends Module
    {
        /**
         * Creates a new audio module
         * @param {string} src the path to the audio
         */
        constructor(src)
        {
            super();
            this.src = src;

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
            const audioElement = createElement("audio", { controls: true/*, innerText: "Your browser does not support the audio element."*/ });
            audioElement.append(createElement("source", { src: this.src, type: this.type }));
            return audioElement;
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
            const wrapper = createElement("div");
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
     * A container for portfolio entries
     */
    class Entry extends Module
    {
        /**
         * Creates a new entry with the specified parameters
         * @param {string} title title of entry
         * @param {string} id the html id that should be used for this entry
         * @param {string} subtitle optional subtitle of entry
         * @param {ModuleImage} coverImage main image
         * @param {string} shortDescription brief summary of entry for minimized use
         * @param {string} fullDescription full description of entry
         * @param {Gallery} gallery gallery to be shown in full view
         * @param {AudioGallery} audioGallery audio gallery to be shown
         * @param {LinksGroup} links array of strings containing external links to references
         */
        constructor(title, id, shortDescription, fullDescription, subtitle = null, coverImage = null,
            gallery = null, audioGallery = null, links = null)
        {
            super();
            this.title = title;
            this.id = id;
            this.subtitle = subtitle;
            this.coverImage = coverImage;
            this.shortDescription = shortDescription;
            this.fullDescription = fullDescription;
            this.gallery = gallery;
            this.audioGallery = audioGallery;
            this.links = links;
        }

        /**
         * Returns the HTML for this entry
         * @returns {HTMLElement}
         */
        generateHTML()
        {
            const entryElement = createElement("article", { id: "entry-" + this.id });

            entryElement.append
            (
                createElement("h3", { innerText: this.title }),
                createElement("h4", { innerText: this.subtitle }),
                createElement("img", { src: this.coverImage.src, alt: this.coverImage.alt }),
                createElement("p", { innerText: this.shortDescription }),
                this.gallery.generateHTML(),
                this.audioGallery.generateHTML(),
                this.links.generateHTML()
            );

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


    function toggleMenu()
        {
            let sideBar = document.querySelector("aside");
            if(sideBar.style.translate == "0%")
            {
                sideBar.style.translate = "-100%";
            }
            else
            {
                sideBar.style.translate = "0%";
            }
        }

        //https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
        addEventListener("resize", (event) => {});

        onresize = (event) =>
        {
            let sideBar = document.querySelector("aside");
            if(window.innerWidth >= 850)
            {
                sideBar.style.translate = "0%";
            }
            else
            {
                sideBar.style.translate = "-100%";
            }
        };
        // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
        function highlightNavigation(contentId)
        {
            let highlightElement = document.querySelector(contentId);
            if(highlightElement)
            {
                highlightElement.style.borderColor = "#d3cf00";
                setTimeout(() =>
                {
                    highlightElement.style = "";
                }, 500);
            }
        }

        // function maximizeArticle(contentId)
        // {
        //     let maximizeElement = document.querySelector(contentId);
        //     if(maximizeElement)
        //     {
        //         if(maximizeElement.style.position === "fixed")
        //         {
        //             maximizeElement.style = "";
        //         }
        //         else
        //         {
        //             maximizeElement.style.position = "fixed";
        //             maximizeElement.style.margin = "auto";
        //             maximizeElement.style.zIndex = "10";
        //             maximizeElement.style.display = "block";
        //             maximizeElement.style.width = "100vw";
        //             maximizeElement.style.height = "100vh";
        //         }
                
        //     }
        // }
    //Call init when page loads and all functions and classes have been created
    init();
}

//Once the page loads, call function with everything in it
window.addEventListener("load", SCOPE);