const student={template:`
<div>


<div class="d-flex flex-row-reverse ">
<button type="button"
class="btn btn-success m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Dodaj studenta
</button>
</div>

<table class="table table-striped ">
<thead class="light-text">
    <tr>
        <th>
        Id
        </th>
        <th>
        Imie
        </th>
        <th>
        Kierunek
        </th>
        <th>
        Numer Indeksu
        </th>
        <th>
        Opcje
        </th>
    </tr>
</thead>
<tbody >
    <tr v-for="stu in students" >
    
        <td class="data-settings">{{stu.studentID}}</td>
        <td class="data-settings">{{stu.studentImie}}</td>
        <td class="data-settings">{{stu.studentKierunek}}</td>
        <td class="data-settings">{{stu.studentNrIndeksu}}</td>
        <td>
        <button type="button"
        class="btn btn-light mr-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="editClick(stu)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
        </button>
        <button type="button" @click="deleteClick(stu.studentID)"
        class="btn btn-light mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
        </button>
    </td>
    </tr>
</tbody>
</table>


<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <div class="d-flex flex-row bd-highlight mb-3">
        <div class="p-2 w-50 bd-highlight">
            <div class="input-group mb-3">
                <span class="input-group-text">Imie</span>
                <input type="text" class="form-control" v-model="studentImie">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Kierunek</span>
                <input type="text" class="form-control" v-model="studentKierunek">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Nr indeksu</span>
                <input type="text" class="form-control" v-model="studentNrIndeksu">
            </div>
        </div>
        <div class="p-2 w-50 bd-highlight">
            <img style="width:200px;height:200px" v-bind:src="PhotoPath+imageName"/>
            <input class="m-2 form-control-file" type="file" accept="image/*" @change="imageUpload($event)" >
        </div>
    </div>
        <button type="button" @click="createClick()"
        v-if="studentID==0" class="btn btn-primary">
        Utwórz
        </button>
        <button type="button" @click="updateClick()"
        v-if="studentID!=0" class="btn btn-primary">
        Edytuj
        </button>
    </div>
</div>
</div>
</div>
</div>

`,

data(){
    return{
        students:[],
        modalTitle:"",
        studentID:0,
        studentImie:"",
        studentKierunek:"",
        studentNrIndeksu:"",
        imageName:"anonymous.png",
        imageFile:null,
        PhotoPath:variables.PHOTO_URL

    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"Students").then((response)=>{
            this.students=response.data;
        });
    },
    addClick(){
        this.modalTitle="Dodaj studenta";
        this.studentID=0;
        this.studentImie="";
        this.studentKierunek="",
        this.studentNrIndeksu="",
        this.imageName="anonymous.png"
    },
    editClick(stu){
        this.modalTitle="Edytuj studenta";
        this.studentID=stu.studentID;
        this.studentImie=stu.studentImie;
        this.studentKierunek=stu.studentKierunek,
        this.studentNrIndeksu=stu.studentNrIndeksu,
        this.imageName=stu.imageName
    },
    createClick(){
        let formData = new FormData();

        formData.append("studentImie", this.studentImie);
        formData.append("studentKierunek", this.studentKierunek);
        formData.append("studentNrIndeksu", this.studentNrIndeksu);
        formData.append("imageFile", this.imageFile);

        if(imageFile=!null){
        axios.post(variables.API_URL+"Students", formData
        )
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        })
        .catch((err) =>{console.log(err)});
        }
        else
        alert("złe dane")
    },
    updateClick(){
        let formData = new FormData();

        formData.append("studentID", this.studentID);
        formData.append("studentImie", this.studentImie);
        formData.append("studentKierunek", this.studentKierunek);
        formData.append("studentNrIndeksu", this.studentNrIndeksu);
        formData.append("imageFile", this.imageFile);
        formData.append("imageName", this.imageName);


        axios.put(variables.API_URL+"Students/"+this.studentID, formData)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        })
        .catch((err) =>{console.log(err)});    

    },
    deleteClick(id){
        if(!confirm("Czy aby napewno chcesz usunąć tego studenta?")){
            
            return;
        }
        axios.delete(variables.API_URL+"Students/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },
    imageUpload(event){
        this.imageFile = event.target.files[0];
    }
    
},
mounted:function(){
    this.refreshData();
}




}