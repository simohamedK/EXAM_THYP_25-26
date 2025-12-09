
    const modal = document.getElementById('nuageModal');
    const zoneNuage = document.getElementById('zone-nuage-modal');
    const searchForm = document.querySelector('.search-bar form');
    const searchInput = document.querySelector('.search-bar input[name="query"]');
    const selectionInfo = document.getElementById('selection-info');

    let selectedWords = [];

    function handleWordCloudClick(mot, element) {
        
        const index = selectedWords.indexOf(mot);

        if (index === -1) {
            selectedWords.push(mot);
            
            if (!element.dataset.originalColor) {
                element.dataset.originalColor = element.style.fill;
            }
            element.style.fill = "#ff4500"; 
            element.style.fontWeight = "bold";
            element.style.textDecoration = "underline";

        } else {
            selectedWords.splice(index, 1);
            
            element.style.fill = element.dataset.originalColor;
            element.style.fontWeight = "normal";
            element.style.textDecoration = "none";
        }

        if (selectedWords.length > 0) {
            selectionInfo.innerText = selectedWords.length + " mot(s) sélectionné(s) : " + selectedWords.join(", ");
        } else {
            selectionInfo.innerText = "Cliquez sur des mots pour les ajouter...";
        }

    }

    function validerSelection() {
        if (selectedWords.length > 0) {
            searchInput.value = selectedWords.join(" "); // espace entre les mots
            searchForm.submit();
        } else {
            fermerModal();
        }
    }

    async function ouvrirModalNuage(docChemin) {
        modal.style.display = "flex";
        zoneNuage.innerHTML = '<div class="loader">Chargement...</div>';
        selectedWords = []; // On remet à zéro la sélection à l'ouverture
        selectionInfo.innerText = "Cliquez sur des mots pour les ajouter...";

        try {
            const response = await fetch(`/nuage/${encodeURIComponent(docChemin)}`);
            if (!response.ok) throw new Error("Erreur serveur");
            const html = await response.text();
            zoneNuage.innerHTML = html;
        } catch (e) {
            zoneNuage.innerHTML = `<p style="color:red">Erreur: ${e.message}</p>`;
        }
    }

    function fermerModal() {
        modal.style.display = "none";
        zoneNuage.innerHTML = "";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            fermerModal();
        }
    }