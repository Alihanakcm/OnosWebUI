import { DeviceService } from 'src/app/services/device-service/device.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';
import { Device } from 'src/app/entities/device';
import { Flow } from 'src/app/entities/flow';
import { Criteria } from 'src/app/entities/criteria';
import { Instruction } from 'src/app/entities/instruction';
import { FlowService } from 'src/app/services/flow-service/flow.service';
import { InstructionParameters } from '../models/instruction-parameters';
import { CriteriaParameters } from '../models/criteria-parameters';
import { InstructionParameterName } from '../operations/instruction-parameter-names'
import { CriteriaParameterName } from '../operations/criteria-parameter-names'
import { ApplicationService } from 'src/app/services/application-service/application.service';

@Component({
    selector: 'insert-flow',
    templateUrl: 'insert-flow.html',
    styleUrls: ['insert-flow.css'],
    providers: [DeviceService, FlowService, ApplicationService],

})
export class InsertFlow implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private deviceService: DeviceService,
        private flowService: FlowService,
        private applicationService: ApplicationService

    ) { }
    ngOnInit(): void {
        this.deviceService.getDevices().subscribe((data) => {
            this.devices = data;
        });
        this.applicationService.getApplications().subscribe(data => {
            this.applications = data
        })
    }
    flowRuleParametersForm = new FormGroup({
        isPermanent: new FormControl("", Validators.required),
        priority: new FormControl("", Validators.required),
        timeout: new FormControl("", Validators.required),
        deviceId: new FormControl("", Validators.required),
        appId: new FormControl("", Validators.required),
    });

    instructionParameterName = InstructionParameterName;
    criteriaParameterName = CriteriaParameterName;
    instructionParameters = InstructionParameters;
    criteriaParameters = CriteriaParameters;

    firstFormGroup = FormGroup;
    secondFormGroup: FormGroup;
    isOptional = false;
    isLinear = false;

    L2ModificationTypes: string[] = ["VLAN_PUSH", "VLAN_ID", "VLAN_PCP", "ETH_SRC", "ETH_DST", "MPLS_LABEL", "MPLS_PUSH", "TUNNEL_ID"]
    L3ModificationTypes: string[] = ["IPV4_SRC", "IPV4_DST", "IPV6_SRC", "IPV6_DST", "IPV6_FLABEL"]
    instructionTypes: string[] = [
        "GROUP",
        "L0MODIFICATION",
        "L1MODIFICATION",
        "L2MODIFICATION",
        "L3MODIFICATION",
        "L4MODIFICATION",
        "METER",
        "OUTPUT",
        "QUEUE",
        "TABLE"
    ]
    criteriaTypes: string[] = [
        "ETH_TYPE",
        "ETH_DST",
        "ETH_SRC",
        "IN_PORT",
        "IN_PHY_PORT",
        "METADATA",
        "VLAN_VID",
        "VLAN_PCP",
        "INNER_VLAN_VID",
        "INNER_VLAN_PCP",
        "IP_DSCP",
        "IP_ECN",
        "IP_PROTO",
        "IPV4_SRC",
        "IPV4_DST",
        "TCP_SRC",
        "TCP_DST",
        "UDP_SRC",
        "UDP_DST",
        "SCTP_SRC",
        "SCTP_DST",
        "ICMPV4_TYPE",
        "ICMPV4_CODE",
        "IPV6_SRC",
        "IPV6_DST",
        "IPV6_FLABEL",
        "ICMPV6_TYPE",
        "ICMPV6_CODE",
        "IPV6_ND_TARGET",
        "IPV6_ND_SLL",
        "IPV6_ND_TLL",
        "MPLS_LABEL",
        "IPV6_EXTHDR",
        "OCH_SIGID",
        "GRID_TYPE",
        "CHANNEL_SPACING",
        "SPACING_MULIPLIER",
        "SLOT_GRANULARITY",
        "OCH_SIGID",
        "TUNNEL_ID",
        "OCH_SIGTYPE",
        "ODU_SIGID",
        "ODU_SIGTYPE",
    ]
    tabs = ['Flow Rule', "Add"];

    selected = new FormControl(0);
    selectedType: string = "Instruction";
    devices: Device[];
    applications;
    flow = new Flow();
    Criteria: Criteria
    Instruction: Instruction
    appId
    displayedColumns = ['type', 'value'];

    subType: string;
    selectedRuleType: string;
    selectedRuleValue1: string;
    selectedRuleValue2: string;
    selectedRuleValue3: string;
    selectedRuleValue4: string;
    selectedRuleValue5: string;

    addFlowRuleParameters() {
        this.flow.isPermanent = this.flowRuleParametersForm.value.isPermanent;
        this.flow.priority = this.flowRuleParametersForm.value.priority;
        this.flow.timeout = this.flowRuleParametersForm.value.timeout;
        this.flow.deviceId = this.flowRuleParametersForm.value.deviceId;
        this.flow.appId = this.flowRuleParametersForm.value.appId;

    }
    addTab(selectAfterAdding: boolean) {
        this.addRule(this.selectedRuleType, this.subType, this.selectedRuleValue1, this.selectedRuleValue2, this.selectedRuleValue3, this.selectedRuleValue4, this.selectedRuleValue5)

        this.tabs.push('New');

        if (selectAfterAdding) {
            this.selected.setValue(this.tabs.length - 1);
        }

    }
    clear() {
        this.selectedRuleValue1 = "";
        this.selectedRuleValue2 = "";
        this.selectedRuleValue3 = "";
        this.selectedRuleValue4 = "";
        this.selectedRuleValue5 = "";
        this.subType = "";
        this.selectedRuleType = "";
    }
    removeTab(index: number) {
        this.removeRule();
        this.tabs.splice(index, 1);
    }
    addRule(selectedRuleType: string, subType: string,
        selectedValue1: string,
        selectedValue2: string,
        selectedValue3: string,
        selectedValue4: string,
        selectedValue5: string) {

        if (this.selectedType == "Instruction") {
            console.log("GELDİ");
            switch (this.selectedRuleType) {
                case 'QUEUE':
                    this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "queueId": "${selectedValue1}", "port": "${selectedValue2}" }`)
                    break;
                case 'L0MODIFICATION': {
                    if (subType == 'LAMBDA')
                        this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "lambda": "${selectedValue1}" }`)
                    else
                        this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "gridType": "${selectedValue1}", "channelSpacing": "${selectedValue2}", "spacingMultiplier": "${selectedValue3}", "slotGranularity": "${selectedValue4}" }`)
                }; break;
                case 'L1MODIFICATION':
                    this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "oduSignalId": { "tributaryPortNumber": "${selectedValue1}", "tributarySlotLength": "${selectedValue2}", "tributarySlotBitMap": "${selectedValue3}" } }`)
                    break;
                case 'L2MODIFICATION':
                    switch (subType) {
                        case "VLAN_ID":
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "vlanId": "${selectedValue1}" }`)
                            break;
                        case "VLAN_PCP":
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "vlanPcp": "${selectedValue1}" }`)
                            break;
                        case "ETH_SRC":
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "mac": "${selectedValue1}" }`)
                            break;
                        case "ETH_DST":
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "mac": "${selectedValue1}" }`)
                            break;
                        case "MPLS_LABEL":
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "label": "${selectedValue1}" }`)
                            break;
                        case "MPLS_PUSH":
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "ethernetType": "${selectedValue1}" }`)
                            break;
                        case "TUNNEL_ID":
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "tunnelId": "${selectedValue1}" }`)
                            break;
                        default:
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}" }`)
                            break;
                    }
                    break;
                case 'L3MODIFICATION': switch (subType) {
                    case "IPV4_SRC":
                        this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "ip": "${selectedValue1}" }`)
                        break;
                    case "IPV4_DST":
                        this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "ip": "${selectedValue1}" }`)
                        break;
                    case "IPV6_SRC":
                        this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "ip": "${selectedValue1}" }`)
                        break;
                    case "IPV6_DST":
                        this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "ip": "${selectedValue1}" }`)
                        break;
                    case "IPV6_FLABEL":
                        this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "flowLabel": "${selectedValue1}" }`)
                        break;
                    default:
                        break;
                }
                case 'L4MODIFICATION':
                    if (subType == 'TCP_SRC')
                        this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "tcpPort": "${selectedValue1}" }`)
                    else
                        this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "subType": "${subType}", "udpPort": "${selectedValue1}" }`)

                default:
                    switch (selectedRuleType) {
                        case 'METER':
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "meterId": "${selectedValue1}"  }`)
                            break;
                        case 'GROUP':
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "groupId": "${selectedValue1}" }`)
                            break;
                        case 'OUTPUT':
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "port": "${selectedValue1}" }`)
                            break;
                        case 'TABLE':
                            this.flow.treatment.instructions.push(`{ "type": "${selectedRuleType}", "tableId": "${selectedValue1}"  }`)
                            break;
                        default:
                            break;
                    }
                    break;
            }
        }
        else {
            switch (selectedRuleType) {
                case "ETH_TYPE":
                    this.flow.selector.criteria.push(`{ "type": "${selectedRuleType}", "ethType":"${selectedValue1}" }`)
                    break;
                case "ETH_DST":
                    this.flow.selector.criteria.spush(`{ "type":  "${selectedRuleType}", "mac": "${selectedValue1}" }`)
                    break;
                case "ETH_SRC":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "mac": "${selectedValue1}" }`)
                    break;
                case "IN_PORT":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "port": "${selectedValue1}" }`)
                    break;
                case "IN_PHY_PORT":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "port": "${selectedValue1}" }`)
                    break;
                case "METADATA":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "metadata": "${selectedValue1}" }`)
                    break;
                case "VLAN_VID":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "vlanId": "${selectedValue1}" }`)
                    break;
                case "VLAN_PCP":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "priority": "${selectedValue1}" }`)
                    break;
                case "INNER_VLAN_VID":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "innerVlanId": "${selectedValue1}" }`)
                    break;
                case "INNER_VLAN_PCP":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "innerPriority": "${selectedValue1}" }`)
                    break;
                case "IP_DSCP":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "ipDscp": "${selectedValue1}" }`)
                    break;
                case "IP_ECN":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "ipEcn": "${selectedValue1}" }`)
                    break;
                case "IP_PROTO":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "protocol": "${selectedValue1}" }`)
                    break;
                case "IPV4_SRC":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "ip": "${selectedValue1}" }`)
                    break;
                case "IPV4_DST":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "ip": "${selectedValue1}" }`)
                    break;
                case "TCP_SRC":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "tcpPort": "${selectedValue1}" }`)
                    break;
                case "TCP_DST":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "tcpPort": "${selectedValue1}" }`)
                    break;
                case "UDP_SRC":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "udpPort": "${selectedValue1}" }`)
                    break;
                case "UDP_DST":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "udpPort": "${selectedValue1}" }`)
                    break;
                case "SCTP_SRC":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "sctpPort": "${selectedValue1}" }`)
                    break;
                case "SCTP_DST":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "sctpPort": "${selectedValue1}" }`)
                    break;
                case "ICMPV4_TYPE":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "icmpType": "${selectedValue1}" }`)
                    break;
                case "ICMPV4_CODE":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "icmpCode": "${selectedValue1}" }`)
                    break;
                case "IPV6_SRC":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "ip": "${selectedValue1}" }`)
                    break;
                case "IPV6_DST":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "ip": "${selectedValue1}" }`)
                    break;
                case "IPV6_FLABEL":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "flowLabel": "${selectedValue1}" }`)
                    break;
                case "ICMPV6_TYPE":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "icmpv6Type": "${selectedValue1}" }`)
                    break;
                case "ICMPV6_CODE":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "icmpv6Code": "${selectedValue1}" }`)
                    break;
                case "IPV6_ND_TARGET":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "targetAddress": "${selectedValue1}" }`)
                    break;
                case "IPV6_ND_SLL":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "mac": "${selectedValue1}" }`)
                    break;
                case "IPV6_ND_TLL":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "mac": "${selectedValue1}" }`)
                    break;
                case "MPLS_LABEL":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "label": "${selectedValue1}" }`)
                    break;
                case "IPV6_EXTHDR":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "exthdrFlags": "${selectedValue1}" }`)
                    break;
                case "OCH_SIGID":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "lambda": "${selectedValue1}" }`)
                    break;
                case "GRID_TYPE":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "gridType": "${selectedValue1}" }`)
                    break;
                case "CHANNEL_SPACING":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "channelSpacing": "${selectedValue1}" }`)
                    break;
                case "SPACING_MULIPLIER":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "spacingMultiplier": "${selectedValue1}" }`)
                    break;
                case "SLOT_GRANULARITY":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "slotGranularity": "${selectedValue1}" }`)
                    break;
                case "OCH_SIGID":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "ochSignalId": "${selectedValue1}" }`)
                    break;
                case "TUNNEL_ID":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "tunnelId": "${selectedValue1}" }`)
                    break;
                case "OCH_SIGTYPE":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "ochSignalType": "${selectedValue1}" }`)
                    break;
                case "ODU_SIGID":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "oduSignalId": "${selectedValue1}", "tributaryPortNumber": "${selectedValue2}", "tributarySlotBitmap": "${selectedValue3}", "tributarySlotLen": "${selectedValue4}" }`)
                    break;
                case "ODU_SIGTYPE":
                    this.flow.selector.criteria.push(`{ "type":  "${selectedRuleType}", "ethType": "${selectedValue1}" }`)
                    break;

                default:
                    break;
            }
        }
        this.clear;


    }
    removeRule() {
        if (this.selectedType == "Instruction") {
            this.flow.treatment.pop();
        }

        else this.flow.selector.pop();
    }
    createFlow() {
        let flowRule: string = `{"flows":[{
            "priority":${this.flowRuleParametersForm.value.priority},
            "timeout": ${this.flowRuleParametersForm.value.timeout},
        "isPermanent": ${this.flowRuleParametersForm.value.isPermanent},
        "deviceId": "${this.flowRuleParametersForm.value.deviceId}",
            "treatment": { "instructions": [${this.flow.treatment.instructions}] },
        "selector": { "criteria": [${this.flow.selector.criteria}] }
    }]
} `;
        this.flowService.createFlow(flowRule, this.flow.appId).subscribe(data => {
            console.log(data);

        });

    }
}


