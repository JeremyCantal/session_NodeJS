// Node. js est une plateforme logicielle avec une architecture orientée événements 
// qui permet d'utiliser le langage de script JavaScript, initialement développé 
// pour une utilisation côté client

// event-driven : architecture orientée événements
// Les architectures event-driven offrent souvent des solutions élégantes 
// pour fournir du code maintenable, gérer des tâches asynchrones et construire des applications fiables.

// SYNCHRONE / ASYNCHRONE

// En informatique, on dit que deux opérations sont synchrones lorsque la seconde attend 
// que la première ait fini son travail pour démarrer, le début de l’opération suivante dépend de la complétude de l’opération précédente.

// Au contraire, deux opérations sont qualifiées d’asynchrones en informatique lorsqu’elles sont indépendantes 
// c’est-à-dire lorsque la deuxième opération n’a pas besoin d’attendre que la première se termine pour démarrer.

// Par défaut, le JavaScript est un langage synchrone, bloquant et qui ne s’exécute que sur un seul thread.

// Cela signifie que :

// Les différentes opérations vont s’exécuter les unes à la suite des autres (elles sont synchrones) ;
// Chaque nouvelle opération doit attendre que la précédente ait terminé pour démarrer 
// (l’opération précédente est « bloquante ») ;
// Le JavaScript ne peut exécuter qu’une instruction à la fois

// boucle événementielle : Construction JavaScript qui permet de terminer une nouvelle tâche tout en attendant une autre

// Le code asynchrone sera écrit de trois façons : les callbacks, les promesses et les mots-clés async await

// Lorsque JavaScript rencontre une opération asynchrone, comme l'écriture dans un fichier, 
// elle l'ajoute à une table dans sa mémoire. Cette table stocke l'opération, la condition 
// pour qu'elle soit exécutée et la fonction à appeler lorsqu'elle est terminée.

// Synchrone : Cela peut rapidement poser problème dans un contexte Web :

// imaginons qu’une de nos fonctions ou qu’une boucle prenne beaucoup de temps à s’exécuter. 
// Tant que cette fonction n’a pas terminé son travail, la suite du script ne peut pas s’exécuter (elle est bloquée) 
// et le programme dans son ensemble parait complètement arrêté du point de vue de l’utilisateur.



// Ecrire une fonction qui permet de verifier si element appartient a tab

var tab = [1, 3, 6, 8, 9];
var element = 6;

// Synchrone 

function search(elt, tab) {
    for (var i = 0; i < tab.length; i++) {
        if (elt === tab[i]) {
            console.log('Element Found');
        }
    }
}

search(element, tab);



// **********************************************CALLBACKS*********************************************** //


// Une fonction de callback est une fonction qui est transmise comme argument 
// à une autre fonction, puis exécutée lorsque l'autre fonction est terminée.
// une fonction de rappel ou « callback » en anglais est une fonction qui va pouvoir être 
// rappelée (« called back ») à un certain moment et / ou si certaines conditions sont réunies. 
// Nous utilisons les callbacks pour nous assurer que le code est exécuté uniquement 
// après la fin d'une opération asynchrone.

var searchElement = function (data, callback) {

    for (var i = 0; i < data.tableau.length; i++) {
        if (data.tableau[i] == data.filtre) {
            return callback(null, i);
        }
    }
    return callback('Element ' + data.filtre + ' non retrouve dans tableau');
};

var tab = [1, 3, 6, 8, 9];
var element = 6;
var data = { tableau: tab, filtre: element };

// Cette fonction lit l'objet Data, ici un tableau et un element de maniere asynchrone

// En d'autres termes, le programme n'attends pas la fin de la fonction 
// Et lorsque cette fonction termine sa tache, elle appelle la fonction Callback

// Une fonction CallBack prend deux parametres

// un parametre err qui reste vide si la fonction a bien ete executee,
// un parametre result qui contient le resultat si la fonction n’a pas detecter d’erreurs
// sinon il contient le contenu du message d’erreur


searchElement(data, function (err, result) {
    if (err)
        console.error("erreur :" + err)
    else
        console.log(data.filtre + " existe a la position " +
            result)
});


// **********************************************PROMESSES*********************************************** //


    // //Déclaration :
    //     var test = true;
    //     var promesse = new Promise((resolve, reject) => {
    //         if(test)
    //             resolve();
    //         else
    //             reject();
    //     });

    // // Utilisation

    //     promesse.then(() => console.log('Test réussi'))
    //             .catch(() => console.log('Erreur'));

// OU

    //Déclaration
        var promesse = () => {
            return new Promise((resolve, reject) => {
                if(test)
                    resolve();
                else
                    reject();
            });
        };

    // Utilisation

        promesse().then(() => console.log('Test réussi'))
                .catch(() => console.log('Erreur'));


// Une promesse peut recevoir des paramètres et retourner un résultat

    let division = (a, b) => {
        return new Promise((resolve, reject) => {
            if (b!= 0)
                resolve(a/b);
            else    
                reject("Erreur : Division pas zéro impossible !");
        });
    };

    division(10,0).then((res) => console.log('resultat : ' + res))
                .catch((error) => console.log(error));


// **********************************************ASYNC / AWAIT*********************************************** //

// let somme = (a, b) => a + b;
// console.log(somme(2, 3));

// Pour transformer la fonction somme() en promesse, on ajoute le mot-clé 'async'

let somme = async (a, b) => a + b;
somme(2, 3).then((res) => console.log('Résultat : ' + res)); // Affiche 5

// Le mot-clé await :
    // Utilisable seulement dans les environnements asynchrones
    // permettant d'intérrompre l'éxécution de l fonction asynchrone
    // et attendre la résolution de la promesse

let somme2 = (a, b) => {
    return new Promise((resolve) =>{
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
}

let sommeCarre = async (a, b) => {
    let s = await somme2(a, b).then((res) => res);
    let result = Math.pow(s, 2); // 2 pour puissance 2 (carré)
    return result;
}

sommeCarre(2, 3).then((res) => console.log('Résultat somme carré : ' + res)); //  Affiche Nan car n'a pas obtenu le résultat de somme2
                                                                                // lorsqu'on a calculé le carré sans la déclaration du mot-clé 'await'


// En utilisant les fonctions callback, ecrire une fonction qui permet de
// determiner le nombre d’occurrence d’une sous-chaıne de caractere ch
// dans une chaıne de caractere str.
// ch = ab
// str = abbbaaaabaaabb
// la fonction retourne 3.

var searchSousChaine = function (data, callback) {
    var compteur = 0;
    var pos = data.chaine.indexOf(data.filtre)
    if (pos == -1) {
        return callback('Sous-chaîne "' + data.filtre + '" non retrouvée dans "' + data.chaine + '"');
    }
    else {
        while(pos != -1){
                compteur += 1;
                pos = data.chaine.indexOf(data.filtre, pos + 1);
            }
        }
    return callback(null, compteur);
};

var ch = 'ab';
var str = 'abbbaaaabaaabb';
var data = { chaine: str, filtre: ch };



searchSousChaine(data, function (err, result) {
    if (err)
        console.error("erreur :" + err)
    else
        console.log('"' + data.filtre + '" existe ' + result + ' fois dans "' + str + '"')
});


//****************************************************************************  correction *********************************************************************


var searchElement2 = function (data, callback) {

    // Déclaration d'une variable str et initialisation par l'objet data passé en paramètre
    // Dans notre exemple, data.string (exo ->  var str = "abbbaaaabaaabb";)
    var str = data.string;

    // Déclaration et initialisation d'une variable count à 0, nous permettant de stocker le nombre d'occurences
    var count = 0;

    // Déclaration d'une variable pos
    // Appel de La méthode indexOf(élémentRecherché) prenant en paramètre un élément 
    // Ici, data.filtre (exo ->  var ch = "ab";)
    // nous permettant de renvoyer le premier indice de cet élément donné dans str.
    var pos = str.indexOf(data.filtre);

    // Si on trouve la valeur, on affiche le nombre'occurences
    // Sinon on affiche le message d'erreur
    if (pos != -1) {
        



        while (pos != -1) {

            // Quand une occurence est trouve dans le chaine
            // On incremente count, ici le nombre d'occurence de 1
            count++;

            // Rappel de La méthode indexOf(élémentRecherché, indiceDébut) prenant en paramètre un élément
            // et un indice de début, ici pos + 1  indice à partir de la variable pos initialisée en dehors de la boucle
            // Quand une occurence est trouve dans le chaine
            // On incremente aussi pos, ici l'indice dans la chaîne
            pos = str.indexOf(data.filtre, pos + 1);

        }
        return callback(null, count);
    }
    return callback('Element ' + data.filtre + ' non retrouve dans ' + data.string);
};

// function maFonctionCallBack(err, result) {
//     if (err)
//         console.error("erreur :" + err);
//     else
//         console.log(ch + " existe " +
//             result + " fois ");
// }

var str = "abbbaaaabaaabb";
var ch = "ab";

var data = { string: str, filtre: ch };

searchElement2(data, function (err, result) {
    if (err)
        console.error("erreur :" + err);
    else
        console.log(ch + " existe " +
            result + " fois ");
});

//****************************************************************************  Fin correction *********************************************************************






















