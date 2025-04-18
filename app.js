function handleImageError(img) {
    img.onerror = null; 
    img.src = 'https://via.placeholder.com/300x200.png?text=Recipe+Image';
}
const recipes = [
    {
        title: "Butter Chicken",
        image: "butterchicken.webp",
        servings: 4,
        cookTime: "45 mins",
        category: "non-vegetarian",
        tags: ["chicken", "curry", "north-indian"],
        ingredients: [
            "500g chicken",
            "1 cup yogurt",
            "2 tbsp ginger-garlic paste",
            "1 tsp turmeric",
            "2 tsp garam masala",
            "1 cup tomato puree",
            "1/2 cup cream",
            "2 tbsp butter"
        ],
        instructions: [
            "Marinate chicken in yogurt and spices for 2 hours",
            "Cook chicken in tandoor or oven",
            "Prepare tomato-based gravy",
            "Combine chicken and gravy",
            "Finish with cream and butter"
        ]
    },
    {
        title: "Palak Paneer",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733",
        servings: 3,
        cookTime: "30 mins",
        category: "vegetarian",
        tags: ["paneer", "vegetarian", "healthy"],
        ingredients: [
            "200g paneer",
            "500g spinach",
            "1 onion",
            "2 tomatoes",
            "1 tsp cumin",
            "1 tsp coriander powder",
            "1/2 tsp garam masala"
        ],
        instructions: [
            "Blanch and puree spinach",
            "Sauté onions and tomatoes",
            "Add spices and spinach puree",
            "Add cubed paneer",
            "Simmer for 10 minutes"
        ]
    }
];

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
});

// Recipe Display Functions
function displayRecipes(filteredRecipes) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';
    
    filteredRecipes.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <img src="${recipe.image}" class="card-image" alt="${recipe.title}">
            <div class="card-content">
                <h3>${recipe.title}</h3>
                <div class="recipe-meta">
                    <p><i class="fas fa-users"></i> ${recipe.servings} servings</p>
                    <p><i class="fas fa-clock"></i> ${recipe.cookTime}</p>
                </div>
                <div class="recipe-tags">
                    ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        card.addEventListener('click', () => showRecipe(index));
        recipeList.appendChild(card);
    });
}
function filterRecipes(searchTerm = '') {
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    const filtered = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
        const matchesCategory = activeCategory === 'all' || recipe.category === activeCategory;
        return matchesSearch && matchesCategory;
    });
    displayRecipes(filtered);
}

// Event Listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
    filterRecipes(e.target.value);
});

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterRecipes(document.getElementById('searchInput').value);
    });
});

// Recipe Detail View
function showRecipe(index) {
    const recipe = recipes[index];
    document.getElementById('recipeList').style.display = 'none';
    document.getElementById('recipeView').style.display = 'block';
    
    document.getElementById('recipeImage').src = recipe.image;
    document.getElementById('recipeTitle').textContent = recipe.title;
    document.getElementById('servings').textContent = recipe.servings;
    document.getElementById('cookTime').textContent = recipe.cookTime;
    
    document.getElementById('ingredients').innerHTML = 
        recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
    
    document.getElementById('instructions').innerHTML = 
        recipe.instructions.map(step => `<li>${step}</li>`).join('');
}

// Back to List View
window.showRecipeList = function() {
    document.getElementById('recipeView').style.display = 'none';
    document.getElementById('recipeList').style.display = 'grid';
    filterRecipes(document.getElementById('searchInput').value);
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    filterRecipes();
});