document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelectorAll(".skill-category .category-header").forEach((header)=>{
        header.addEventListener("click", ()=>{
            const category = header.parentElement;
            // Toggle open class
            category.classList.toggle("open");
            // Close siblings if you want only one open at a time:
            document.querySelectorAll(".skill-category").forEach((cat)=>{
                if (cat !== category) cat.classList.remove("open");
            });
        });
    });
});

//# sourceMappingURL=index.8c352f77.js.map
