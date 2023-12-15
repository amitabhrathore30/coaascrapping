import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupSearchComponent } from './components/popup-search/popup-search.component';
import { PythonApiService } from './Services/python-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GPT-POC-UI';
  loader: boolean = false;

  constructor(
    public dialog: MatDialog,
    private pythonService: PythonApiService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupSearchComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      debugger;
      console.log('The dialog was closed');
      if (result != null && result != undefined) {
        console.log(result);
        this.pythonService
          .DownloadAutomatedFiles(result.keyword, result.fileFormat)
          .subscribe((data: any) => {
            debugger;
            console.log(data);
          });
      }
    });
  }
  isDialogOpen: boolean = false;
  history: string[] = [];
  openSampleData(): void {
    this.isDialogOpen = true;
  }

  closeSampleData(): void {
    this.isDialogOpen = false;
  }
  onSearchClick(query: string): void {
    this.loader = true;
    this.jsonInput='';
    this.parsedJson={} as JSON;
    this.pythonService.GetDataForScrapping(query).subscribe((data: any) => {
      debugger;
      this.jsonInput = data;
      this.history.push(data);
      this.loader = false;
    });
  }
  jsonInput: string = '';
  parsedJson: any;

  parseJson(): void {
    try {
      this.parsedJson = JSON.parse(this.jsonInput);
    } catch (error) {
      console.error('Invalid JSON:', error);
      this.parsedJson = null;
    }
  }

  sampleDataJson = [
    {
      "ID": 1,
      "title": "Increased plasmablasts enhance T cell-mediated beta cell destruction and promote the development of type 1 diabetes",
      "pdfFreeText": "Background: Although type 1 diabetes (T1D) is typically described as a T cell-mediated autoimmune disease, increasing evidence for a role of B cells has emerged. However, the pivotal disease-relevant B cell subset and its contribution to islet autoimmunity remain elusive. Methods: The frequencies and phenotypic characteristics of circulating B cell subsets were analyzed using flow cytometry in individuals with new-onset T1D, long-term T1D, type 2 diabetes, and nondiabetic controls, and also in a prospective cohort of patients receiving mesenchymal stromal cell (MSC) transplantation. NOD mice and adoptive transfer assay were used to dissect the role of the certain B cell subset in disease progression. An in-vitro coculture system of islets with immune cells was established to examine the response against islets and the underlying mechanisms. Results: We identified that plasmablasts, a B cell subset at the antibody-secreting stage, were significantly increased and correlated with the deterioration of beta cell function in patients with new-onset T1D. Further, a fall of plasmablast number was associated with the preservation of beta cell function in patients who received MSC transplantation after 3 months of follow-up. Meanwhile, a gradual increase of plasmablasts in pancreatic lymph nodes during the natural progression of insulitis was observed in non-obese diabetic (NOD) mice; adoptive transfer of plasmablasts together with T cells from NOD mice accelerated diabetes onset in NOD/SCID recipients. Conclusions: Our study revealed that plasmablasts may function as antigen-presenting cells and promote the activation and proinflammatory response of CD4(+) T cells, further contributing to the T cell-mediated beta cell destruction. Our results provide insights into the pathogenic role of plasmablasts in islet autoimmunity and may offer new translational strategies for inhibiting T1D development."
    },
    {
      "ID": 2,
      "title": "Progression of type 1 diabetes from latency to symptomatic disease is predicted by distinct autoimmune trajectories",
      "pdfFreeText": "Development of islet autoimmunity precedes the onset of type 1 diabetes in children, however, the presence of autoantibodies does not necessarily lead to manifest disease and the onset of clinical symptoms is hard to predict. Here we show, by longitudinal sampling of islet autoantibodies (IAb) to insulin, glutamic acid decarboxylase and islet antigen-2 that disease progression follows distinct trajectories. Of the combined Type 1 Data Intelligence cohort of 24662 participants, 2172 individuals fulfill the criteria of two or more follow-up visits and IAb positivity at least once, with 652 progressing to type 1 diabetes during the 15 years course of the study. Our Continuous-Time Hidden Markov Models, that are developed to discover and visualize latent states based on the collected data and clinical characteristics of the patients, show that the health state of participants progresses from 11 distinct latent states as per three trajectories (TR1, TR2 and TR3), with associated 5-year cumulative diabetes-free survival of 40% (95% confidence interval [CI], 35% to 47%), 62% (95% CI, 57% to 67%), and 88% (95% CI, 85% to 91%), respectively (p < 0.0001). Age, sex, and HLA-DR status further refine the progression rates within trajectories, enabling clinically useful prediction of disease onset."
    },
    {
      "ID": 3,
      "title": "Fibroblast growth factor-23 rs7955866 polymorphism and risk of chronic kidney disease",
      "pdfFreeText": "Background: A missense gain-of-function fibroblast growth factor-23 (FGF23) gene single nucleotide polymorphism (SNP) (rs7955866) has been associated with FGF23 hypersecretion, phosphaturia, and bone disease. Excess circulating FGF23 was linked with atherosclerosis, hypertension, initiation, and progression of chronic kidney disease (CKD). Methods: The study included 72 CKD stage 2/3 Egyptian patients (27–71 years old, 37 females) and 26 healthy controls matching in age and sex. Repeated measures of blood pressure were used to quantify hypertension on a semiquantitative scale (grades 0 to 5). Fasting serum urea, creatinine, uric acid, total proteins, albumin, calcium, phosphorus, vitamin D3, intact parathyroid hormone (iPTH), and intact FGF23 (iFGF23) were measured. DNA extracted from peripheral blood leucocytes was used for genotyping of FGF23 rs7955866 SNP using the TaqMan SNP genotyping allelic discrimination method. Results: Major causes of CKD were hypertension, diabetic kidney disease, and CKD of unknown etiology. There was no significant difference in minor allele (A) frequency between the studied groups (0.333 in GI and 0.308 in GII). Median (IQR) serum iFGF23 was significantly higher in GI [729.2 (531.9–972.3)] than in GII [126.1 (88.5–152.4)] pg/mL, P < 0.001. Within GI, the minor allele (A) frequency load, coded for codominant inheritance, had a significant positive correlation with both hypertension grade (r = 0.385, P = 0.001) and serum iFGF23 (r = 0.259, P = 0.028). Hypertension grade had a significant positive correlation with serum phosphorus and iFGF23. Conclusions: For the first time in an Egyptian cohort, we report a relatively high frequency of the rs7955866 SNP. It may remain dormant or become upregulated in response to some environmental triggers, notably dietary phosphorus excess, leading to increased circulating iFGF23 with ensuing hypertension and/or renal impairment. Subjects with this SNP, particularly in the homozygous form, are at increased risk for CKD of presumably “unknown” etiology, with a tendency for early onset hypertension and increased circulating iFGF23 out of proportion with the degree of renal impairment. Large-scale population studies are needed to confirm these findings and explore the role of blockers of the renin–angiotensin–aldosterone system and sodium chloride cotransporters in mitigating hypertension associated with FGF23 excess."
    },
    {
      "ID": 4,
      "title": "Clinical and humanistic impact of pharmacotherapeutic follow-up in patients with type 1 diabetes mellitus treated judicially",
      "pdfFreeText": "Background: There is a lack of studies that assess the effectiveness of pharmacotherapeutic follow-up in the context of the judicialization of insulin analogues. Aims: To evaluate the clinical and humanistic impact of pharmacotherapeutic follow-up in patients with type 1 diabetes mellitus who receive insulin analogues by judicial decision in a Brazilian municipality. Methods: A quasi-experimental study of the before-and-after type was carried out through pharmacotherapeutic follow-up. Patients who accepted to participate in the study underwent laboratory tests of glycemic and lipid profile before and after the intervention, and underwent five pharmaceutical consultations. In addition, quality of life and health, knowledge, and skills related to insulin application techniques were analyzed. Results: 28 patients participated in all stages. Of these, most were female (53.6%), with a mean age of 32.8 ± 11.6 years. After the intervention, there was a reduction in blood glucose levels, blood pressure, and increased body mass index. In addition, there was greater knowledge and skills regarding insulin application techniques, improved quality of life, health, greater number of medications used, reduction of pharmacotherapeutic problems, and improvement in eating habits. Conclusion: The pharmacotherapeutic follow-up promoted clinical and humanistic benefits, with improvement in quality of life and health."
    },
    {
      "ID": 5,
      "title": "Impact of anxiety, depression and disease-related distress on long-term glycaemic variability among subjects with Type 1 diabetes mellitus",
      "pdfFreeText": "Background: Anxiety, depression, and disease-related distress are linked to worse overall glycaemic control, in terms of HbA1c. This study was aimed to evaluate whether traits of these emotional disorders are associated with long-term glycaemic variability in subjects with Type 1 diabetes. Methods: Longitudinal retrospective study. Six-year HbA1c data (2014–2019) from 411 subjects with Type 1 diabetes who had participated in a previous study to design a diabetes-specific quality of life questionnaire in the year 2014 were included. Scores for Spanish versions of the Hospital Anxiety and Depression Scale (HADS) and Problem Areas in Diabetes (PAID) scale were obtained at baseline, along with sociodemographic and clinical data. Long-term glycaemic variability was measured as the coefficient of variation of HbA1c (HbA1c-CV). The association between HADS and PAID scores and HbA1c-CV was analysed with Spearman correlations and multiple regression models, both linear and additive, including other covariates (age, sex, diabetes duration time, type of treatment, baseline HbA1c, use of anxiolytic or antidepressant drugs, education level and employment status). Results: Scores of depression, anxiety and distress were positively and significantly correlated to HbA1c-CV in univariate analyses. Multiple regression study demonstrated an independent association only for diabetes distress score (p < 0.001). Age, diabetes duration time, baseline HbA1c, education level and employment status were also significantly associated with HbA1c-CV. However, when subjects were analyzed separately in two age groups, distress scores were associated with HbA1c-CV only among those aged 25 years or older, while anxiety scores, but not distress, were associated with HbA1c-CV among those younger than 25 years. Conclusions: Psychological factors, particularly disease-related distress and anxiety, are associated with long-term glycaemic variability in subjects with Type 1 diabetes."
    },
    {
      "ID": 6,
      "title": "Prediabetes and insulin resistance in a population of patients with heart failure and reduced or preserved ejection fraction but without diabetes, overweight or hypertension",
      "pdfFreeText": "Background: The relationships between glucose abnormalities, insulin resistance (IR) and heart failure (HF) are unclear, especially regarding to the HF type, i.e., HF with reduced (HFrEF) or preserved (HFpEF) ejection fraction. Overweight, diabetes and hypertension are potential contributors to IR in persons with HF. This study aimed to evaluate the prevalence of prediabetes and IR in a population of Vietnamese patients with HFrEF or HFpEF but no overweight, diabetes or hypertension, in comparison with healthy controls, and the relation between prediabetes or IR and HF severity. Methods: We conducted a prospective cross-sectional observational study in 190 non-overweight normotensive HF patients (114 with HFrEF and 76 with HFpEF, 92.6% were ischemic HF, mean age was 70.1 years, mean BMI 19.7 kg/m(2)) without diabetes (neither known diabetes nor newly diagnosed by OGTT) and 95 healthy individuals (controls). Prediabetes was defined using 2006 WHO criteria. Glucose and insulin levels were measured fasting and 2 h after glucose challenge. IR was assessed using HOMA-IR and several other indexes. Results: Compared to controls, HF patients had a higher prevalence of prediabetes (63.2% vs 22.1%) and IR (according to HOMA-IR, 55.3% vs 26.3%), higher HOMA-IR, insulin/glucose ratio after glucose and FIRI, and lower ISIT0 and ISIT120 (< 0.0001 for all comparisons), with no difference for body weight, waist circumference, blood pressure and lipid parameters. Prediabetes was more prevalent (69.3% vs 53.9%, p = 0.03) and HOMA-IR was higher (p < 0.0001) in patients with HFrEF than with HFpEF. Among both HFrEF and HFpEF patients, those with prediabetes or IR had a more severe HF (higher NYHA functional class and NT-proBNP levels, lower ejection fraction; p = 0.04–< 0.0001) than their normoglycemic or non-insulinresistant counterparts, with no difference for blood pressure and lipid parameters. Conclusion: In non-diabetic non-overweight normotensive patients with HF, the prevalence of prediabetes is higher with some trend to more severe IR in those with HFrEF than in those with HFpEF. Both prediabetes and IR are associated with a more severe HF. The present data support HF as a culprit for IR. Intervention strategies should be proposed to HF patients with prediabetes aiming to reduce the risk of incident diabetes. Studies should be designed to test whether such strategies may translate into an improvement of further HF-related outcomes."
    },
    {
      "ID": 7,
      "title": "Prevalence and factors associated with latent autoimmune diabetes in adults (LADA): a cross-sectional study",
      "pdfFreeText": "Background: The Latent Autoimmune Diabetes in Adults (LADA) is a slowly progressive Type 1 diabetes subgroup with onset during middle age. Studies report that about 10% of adults initially diagnosed with clinical Type 2 diabetes (T2D) have LADA. Inappropriate diagnosis and mismanagement of the LADA can increase the risk of diabetic complications, which affect the quality of life and is the cause of increased mortality. In low-income countries setting, data regarding the magnitude of LADA is limited. We carried out this study to estimate the burden of misdiagnosed LADA among T2D patients in selected health facilities in Dar es Salaam and to bring awareness to the use of Glutamic Acid Decarboxylase (GAD) autoantibody in screening for LADA. Methodology: We enrolled 186 phenotypically T2D patients in this cross-sectional study, through a standardized data collection tool we obtained participants’ demographic and clinical information. For testing GAD levels, we used a double-antibody Enzyme-Linked Immunosorbent Assay (ELISA). The Fisher’s Exact and student t-tests were used to test the significance of the statistical associations of the glycaemic control and diabetes complications between T2D and LADA. Results: Out of 186 patients, 156 gave conclusive GAD Ab ELISA reading with LADA accounting for 5.1% (95% CI: 2.5 - 10.0). The mean age of subjects was 54.3 years (Range: 33-85 years). The parameters such as mean age, family history of diabetes mellitus status, Fasting Blood Glucose, clinical characteristics, and complications did not show significant statistical differences between patients with LADA and Type 2 diabetes. However, all LADA- Human Immunodeficiency Virus (HIV) comorbid patients had retinopathy, which was statistically insignificant in 20 (87%) T2D-HIV comorbid patients (p = 0.669). Neither neuropathy, nephropathy, nor Diabetic Mellitus (D.M.) foot syndrome was observed among LADA-HIV comorbid patients. Nevertheless, 22 (95.7%), 3 (13%), and 2 (8.7%) of T2D-HIV comorbidity had neuropathy, nephropathy, or D.M. foot syndrome, respectively. Conclusions: The study established a LADA prevalence of 5.1% among T2D patients and has shown the role of GAD autoantibody in the screening for LADA. The study calls for a well- designed larger longitudinal study to generate strong evidence on the association of risk factors and complications associated with the LADA. This will develop robust evidence on the association of risk factors and complications associated with the LADA and T2D."
    },
    {
      "ID": 8,
      "title": "Prevalence of Complications Associated with Diabetes among Pakistani Patients: A Questionnaire-based Survey",
      "pdfFreeText": "Background: The rate of mortality is increasing in diabetic patients due to diabetes-asso-ciated complications. The common complications include neuropathy, nephropathy, retinopathy, foot ulcer, slow wound healing, kidney dysfunction, amputation, dysfunction of organs, frequent in-fections, sepsis, skin diseases, hearing impairment, cardiovascular disorders, etc. These complications can be diagnosed following some common symptoms such as increased thirst, frequent urina-tion, extreme hunger, unexplained weight loss, fatigue, irritability, blurred vision, slow-healing sores, etc. This survey was designed to study the prevalence of various complications in a group of diabetic patients so that effective treatment options could be developed against the most prevalent complications. Methods: This cross-sectional study was conducted in 2019 in a tertiary care hospital of Karachi after the approval of the ethical committee of the hospital as well as in the University of Karachi. To perform this study, a questionnaire was designed comprised of different questions related to diabetic complications. The consent form was attached to each questionnaire in which the patient agreed to participate voluntarily in this survey. The diabetic patients who visited the General Physician OPD were the subjects of this survey. All designed questions included in the questionnaire were asked either directly from the patients or their attendants. Results: A total of 160 diabetic subjects were part of the study range between the ages of 11 to 90 years. Out of 160 patients, 52 were males, and 108 were females. Among all subjects, 124 (78 %) patients were type 2 while 57 (36 %) were type 1 diabetic patients. 117 (73 %) showed confusion of mind, 104 (65 %) complained of blood pressure, 105 (66 %) had hypertension, 106 (66 %) had eye damage (retinopathy), 96 (60 %) were facing trouble focusing vision, and 70 (44 %) were experiencing seizures, 63 (39 %) patients had laser treatment, 68 (43 %) showed wounds on foot and slow wounds healing, 49 (31 %) were having kidney damage (nephropathy), 79 (49 %) had pain in legs or knee, 35 (22 %) and 26 (16 %) complained of heart problems and liver damage respective-ly. Some patients were found to deal with more hunger, i.e., 99 (62 %) patients, 118 (74 %) were experiencing frequent urine desire, 138 (86 %) showed fatigue, 123 (77 %) complained of thirst, 35 (22 %) had nausea, 30 (19 %) had a frequent cold, 36 (23 %) had skin problems, 17 (11 %) patients showed frequent vomiting, 19 (12 %), 13 (8 %) and 16 (10 %) were experiencing acne formation, stroke and nerve damage (neuropathy) respectively. Conclusion: All age groups showed diabetes-associated complications and different abnormal body conditions. However, the age groups ranging from thirty to eighty years showed more compli-cations. The most prevalent complications reported were retinopathy, nephropathy, diabetic wounds on the foot, slow wound healing, seizures, hypertension, neuropathy, skin infections, cardiovascular disorders, liver damage, and stroke in both types of diabetic patients. Our survey may aid in pointing out the most prevalent diabetic complications prevailing in our population so that effective treatment options could be developed to reduce these life-threatening complications."
    },
    {
      "ID": 9,
      "title": "WFS1-Associated Optic Neuropathy: Genotype-Phenotype Correlations and Disease Progression",
      "pdfFreeText": "OBJECTIVE: To evaluate the pattern of vision loss and genotype-phenotype correlations in WFS1-associated optic neuropathy (WON). DESIGN: Multicenter cohort study. METHODS: The study involved 37 patients with WON carrying pathogenic or candidate pathogenic WFS1 variants. Genetic and clinical data were retrieved from the medical records. Thirteen patients underwent additional comprehensive ophthalmologic assessment. Deep phenotyping involved visual electrophysiology and advanced psychophysical testing with a complementary metabolomic study. Main Outcome Measures: WFS1 variants, functional and structural optic nerve and retinal parameters, and metabolomic profile. RESULTS: Twenty-two recessive and 5 dominant WFS1 variants were identified. Four variants were novel. All WFS1 variants caused loss of macular retinal ganglion cells (RGCs) as assessed by optical coherence tomography (OCT) and visual electrophysiology. Advanced psychophysical testing indicated involvement of the major RGC subpopulations. Modeling of vision loss showed an accelerated rate of deterioration with increasing age. Dominant WFS1 variants were associated with abnormal reflectivity of the outer plexiform layer (OPL) on OCT imaging. The dominant variants tended to cause less severe vision loss compared with recessive WFS1 variants, which resulted in more variable phenotypes ranging from isolated WON to severe multisystem disease depending on the WFS1 alleles. The metabolomic profile included markers seen in other neurodegenerative diseases and type 1 diabetes mellitus. CONCLUSIONS: WFS1 variants result in heterogenous phenotypes influenced by the mode of inheritance and the disease-causing alleles. Biallelic WFS1 variants cause more variable, but generally more severe, vision and RGC loss compared with heterozygous variants. Abnormal cleftlike lamination of the OPL is a distinctive OCT feature that strongly points toward dominant WON."
    },
    {
      "ID": 10,
      "title": "Young adult women's meaning-making of living with type 1 diabetes: towards growth and optimism",
      "pdfFreeText": "Objective: Type 1 diabetes is primarily researched as a medical condition; an examination of the subjective experience of it appears to be neglected. This study explored young women's meaning-making of living with type 1 diabetes in an attempt to uncover possible positive outcomes of growth and optimism.Design: Interpretative phenomenological analysis (IPA) enabled the in-depth exploration of the journeys of a group of young female adults living with type 1 diabetes from distress to positive outcomes. Six participants between the ages of 18 and 25 were recruited from a Centre for Diabetes and Endocrinology, in Parktown, South Africa, to participate in semi-structured interviews about their meaning-making process.Results: Three superordinate themes emerged: (1) the process of reappraising a life with diabetes; (2) the development of diabetes as a lifestyle; and (3) positive outcomes of living with diabetes.Conclusion: Findings in this study demonstrate how the meaning-making process has a significant impact on positive adjustment to living with diabetes. While participants experienced distress, they reframed living with diabetes as an opportunity for empowerment and personal growth. Actively seeking and promoting of the positive outcomes of meaning-making could assist young adults to improve their quality of life while living with diabetes."
    }
   ];
}

export interface DialogData {
  keyword: string;
  fileFormat: string;
}
