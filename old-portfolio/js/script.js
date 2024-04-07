
//#region Initialization

"use strict";

/**
 * Initalization of anything that needs to be called at the beginning
 */
const init = () =>
{
    
};

//#endregion

//#region Module Creator

/**
 * A container for portfolio entries
 */
class Module
{
    /**
     * Creates a new module with the specified parameters
     * @param {string} title title of module
     * @param {string} subtitle optional subtitle of module
     * @param {string} coverImage path to main image
     * @param {string} shortDescription brief summary of module for minimized use
     * @param {string} fullDescription full description of module
     * @param {string[]} gallery array of strings containing paths to all images to be shown in full view
     * @param {string[]} links array of strings containing external links to references
     */
    constructor(title, subtitle = null, coverImage = null, shortDescription, fullDescription,
        gallery = null, links = null)
    {
        this.title = title;
        this.subtitle = subtitle;
        this.coverImage = coverImage;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.gallery = gallery;
        this.links = links;
    }

    /**
     * Generates the HTML for this module
     */
    generateHTML()
    {
        const container = document.createElement("article");
        // container.
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
HTMLElement.prototype.clearElement = function()
    { this.innerHTML = ""; }

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
window.addEventListener("load", init);