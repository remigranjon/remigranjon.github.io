import tkinter


# La classe "Nodes" définit les objets "node" qui correspondent à un point de contact entre différents modules
# Ils possèdent un caractère d'entrée ou de sortie, sont associés à une variable et à un module lié "link"

class Nodes():
    def __init__(self,io="i",name="empty",link="None",root="",type="variable"):
        # variable définissant le caractère entrée ou sortie de la node : "i" pour input et "o" pour output
        self.io = io
        # nom de la variable
        self.name = name
        # nom du module lié
        self.link = link
        # fenêtre racine
        self.root = root
        # caractère affiché ou non
        self.displayed = False
        # décalage horizontal et vertical pour la fenêtre d'hovering
        self.hoveringGapX = 10
        self.hoveringGapY = 10 
        # type de la node (variable, paramètre intrinsèque, paramètre d'intégration, constante)
        self.type = type
        # frame parent
        self.parent = ""


    def __del__(self,event=None):
        if self.displayed and event:
            self.frame.destroy()
            self.hoveringDestroy(event)

    # Méthode de création du rendu graphique
    def display(self,parent):
        # attribution de la variable self.parent
        self.parent = parent
        # création et affichage de la frame porteuse de l'icône et du nom de la node
        self.frame = tkinter.Frame(parent)
        self.frame.pack()
       
        # self.frame.bind("<Leave>",self.hoveringDestroy)
        # création du canvas de l'icône
        self.canvas = tkinter.Canvas(self.frame,height=20,width=20)
        # création du label du nom de la node
        self.label = tkinter.Label(self.frame, text=self.name)
        self.label.bind("<Enter>",self.hoveringInit)
        # si il s'agit d'une node d'entrée, création de l'icône et affichage de l'icône et du nom de la node
        if self.io == "i":
            self.canvas.create_oval(8,5,18,15,width=1)
            self.canvas.create_line(3,10,13,10)
            self.canvas.grid(column=0,row=0)
            self.label.grid(column=1,row=0)

        # s'il s'agit d'une node de sortie, création de l'icône et affichage de l'icône et du nom de la node
        elif self.io == "o":
            self.canvas.create_oval(3,5,13,15,width=1)
            self.canvas.create_line(17,10,7,10)
            self.canvas.grid(column=1,row=0)
            self.label.grid(column=0,row=0)

        # annotation du caractère displayed
        self.displayed = True

        # Binding de destruction de la node
        self.bindDestruction()


    # Méthode d'initialisation de la technique de survol
    def hoveringInit(self,event):
        self.hoveringFrame = tkinter.Frame(self.root)
        labelDisplayed = tkinter.Label(self.hoveringFrame, text=self.link)
        labelDisplayed.pack()
        x = int(self.root.winfo_pointerx()-self.root.winfo_rootx()+self.hoveringGapX)
        y = int(self.root.winfo_pointery()-self.root.winfo_rooty()+self.hoveringGapY)
        self.hoveringFrame.place(x=x,y=y)
        self.label.bind("<Motion>",self.hoveringDisplay)
        self.label.bind("<Leave>",self.hoveringDestroy)

    
    # Méthode utilisée lors du survol d'une node pour afficher une frame indiquant le module lié
    def hoveringDisplay(self,event):
        self.hoveringFrame.destroy()
        self.hoveringFrame = tkinter.Frame(self.root)
        labelDisplayed = tkinter.Label(self.hoveringFrame, text=self.link)
        labelDisplayed.pack()
        x = int(self.root.winfo_pointerx()-self.root.winfo_rootx()+self.hoveringGapX)
        y = int(self.root.winfo_pointery()-self.root.winfo_rooty()+self.hoveringGapY)
        self.hoveringFrame.place(x=x,y=y)

    # Méthode de destruction de la frame de survol
    def hoveringDestroy(self,event):
        self.hoveringFrame.destroy()

    # Méthode de binding de la destruction de node
    def bindDestruction(self):
        self.label.bind("<Button-2>",self.__del__)
        self.label.bind("<Button-3>",self.__del__)


# La classe Module définit un module comme élément constitutif du modèle
class Module ():
    def __init__(self,frame,root,nodes=[]):
        # Les nodes comme points de contact avec les autres modules
        self.nodes = nodes
        
        # -----------------------------------------
        # Éléments graphiques
        # -----------------------------------------

        # La frame tkinter dans laquelle s'insère le module
        self.frame = frame 

        # La fenêtre racine de l'application
        self.root = root

        #La frame correspondant aux nodes d'entrée
        self.nodesInFrame = tkinter.LabelFrame(self.frame,text="Variables d'entrée")
        self.nodesInFrame.grid(column=0, row=0, padx=10, pady=10)
        self.nodesInNodes = tkinter.Frame(self.nodesInFrame)
        self.nodesInNodes.pack()
        self.nodesInAdd = tkinter.Button(self.nodesInFrame,command=self.createNodeIn,text="Ajouter")
        self.nodesInAdd.pack(pady=10)


        # La frame correspondant aux nodes de sortie
        self.nodesOutFrame = tkinter.LabelFrame(self.frame, text="Variables de sortie")
        self.nodesOutFrame.grid(column=2, row=0, rowspan=2, padx=10)
        self.nodesOutNodes = tkinter.Frame(self.nodesOutFrame)
        self.nodesOutNodes.pack()
        self.nodesOutAdd = tkinter.Button(self.nodesOutFrame,command=self.createNodeOut,text="Ajouter")
        self.nodesOutAdd.pack(pady=10)
        

        # La frame correspondant aux nodes de paramètres d'intégration
        self.integrationFrame = tkinter.LabelFrame(self.frame, text="Paramètres d'intégration")
        self.integrationFrame.grid(column=1, row=0, padx=10, pady=10)
        self.integrationNodes = tkinter.Frame(self.integrationFrame)
        self.integrationNodes.pack()
        self.integrationAdd = tkinter.Button(self.integrationFrame,command=self.createNodeIntegration,text="Ajouter")
        self.integrationAdd.pack(pady=10)
        

        # La frame correspondant aux nodes de paramètres intrinsèques
        self.intrinsequeFrame = tkinter.LabelFrame(self.frame, text="Paramètres intrinsèques")
        self.intrinsequeFrame.grid(column=1, row=1, padx=10, pady=10)
        self.intrinsequeNodes = tkinter.Frame(self.intrinsequeFrame)
        self.intrinsequeNodes.pack()
        self.intrinsequeAdd = tkinter.Button(self.intrinsequeFrame,command=self.createNodeIntrinseque,text="Ajouter")
        self.intrinsequeAdd.pack(pady=10)

        #  La frame correspondant aux constantes physiques
        self.constanteFrame = tkinter.LabelFrame(self.frame,text="Constantes") 
        self.constanteFrame.grid(column=0, row=1, padx=10, pady=10)
        self.constanteNodes = tkinter.Frame(self.constanteFrame)
        self.constanteNodes.pack()
        self.constanteAdd = tkinter.Button(self.constanteFrame, command=self.createNodeConstante, text="Ajouter") 
        self.constanteAdd.pack(pady=10)

    # --------------------
    # Méthodes de gestion
    # --------------------     
    
    # Méthode d'ajout d'une nouvelle node
    def addNode(self,newNode):
        self.nodes.append(newNode)
    
    # Méthode de création d'une nouvelle node
    def createNode(self,io,type):
        newNode = Nodes(io=io,root=self.root,type=type)
        self.addNode(newNode)
        if newNode.type=="variable":
            if newNode.io=="i":
                frameParent = self.nodesInNodes
            elif newNode.io=="o":
                frameParent = self.nodesOutNodes
        elif newNode.type=="integration":
            frameParent = self.integrationNodes
        elif newNode.type=="intrinseque":
            frameParent = self.intrinsequeNodes
        elif newNode.type=="constante":
            frameParent = self.constanteNodes
        newNode.display(frameParent)

    # Méthode de création d'une node de variable d'entrée
    def createNodeIn(self):
        self.createNode(io="i",type="variable")

    # Méthode de création d'une node de variable de sortie
    def createNodeOut(self):
        self.createNode(io="o",type="variable")

    # Méthode de création d'une node de paramètre intrinsèque
    def createNodeIntrinseque(self):
        self.createNode(io="i",type="intrinseque")

    # Méthode de création d'une node de paramètre d'intégration
    def createNodeIntegration(self):
        self.createNode(io="i",type="integration")

    # Méthode de création d'une node de constante physique
    def createNodeConstante(self):
        self.createNode(io="i",type="constante")

    # Méthode de recherche d'une node en fonction de son nom
    def searchForNode(self,name):
        for node in self.nodes :
            if node.name == name :
                return node


    # ------------------------
    # Méthodes de l'interface
    # ------------------------

    # Méthode de création de l'environnement graphique
    def createInterface(self):
        for i in range(len(self.nodes)) :
            self.addNodeOnInterface(self.nodes[i])

    # Méthode d'ajout d'une node d'entrée
    def addNodeOnInterface(self,node):
        if node.type == "variable":
            if node.io == "i" :
                node.display(self.nodesInNodes)
            elif node.io =="o" :
                node.display(self.nodesOutNodes)
        elif node.type == "integration":
            node.display(self.integrationNodes)
        elif node.type == "intrinseque":
            node.display(self.intrinsequeNodes)
        elif node.type == "constante":
            node.display(self.constanteNodes)

    # ---------------------------------------------
    # Méthodes de création du fichier algorithmique
    # ---------------------------------------------

    # 

class mainWindow(tkinter.Tk):
    def __init__(self):
        tkinter.Tk.__init__()




root = tkinter.Tk()
root.geometry("600x300")
nodeIn1 = Nodes(io="i",name="test",link="module1",root=root)
nodeOut1 = Nodes(io="o",name="petite sortie", link="C_ext_inf",root=root)
nodeIntegration1 = Nodes(type="integration",name="longueur",link="interface utilisateur",root=root)
nodeIntrinseque1 = Nodes(type="intrinseque",name="U",link="caractéristiques techniques",root=root)
nodeConstante1 = Nodes(type="constante", name="P", link="modèle physique",root=root)
nodes=[nodeIn1,nodeOut1,nodeIntegration1,nodeIntrinseque1,nodeConstante1]
scrollableFrame = tkinter.Frame(root)
scrollableFrame.pack()


masterFrame = tkinter.Frame(scrollableFrame)

verticalScrollBar = tkinter.Scrollbar(scrollableFrame,orient="vertical")
verticalScrollBar.pack(side="right",fill="y")
horizontalScrollBar = tkinter.Scrollbar(scrollableFrame,orient="horizontal")
horizontalScrollBar.pack(side="bottom",fill="x")
masterFrame.pack()
module = Module(masterFrame,root,nodes=nodes)
module.createInterface()
root.mainloop()

