import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { TiDeleteOutline } from 'react-icons/ti'

import './ContractForm.css'
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
} from '../../../../redux/api/ordersApiSlice'
import {
  useCreateContractMutation,
  useUpdateContractMutation,
} from '../../../../redux/api/contractApiSlice'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../../redux/constants'

const ContractForm = () => {
  const farmerTerms = [
    'I agree to deliver crops that meet the quality standards as specified by the company.',
    'I agree to sell 100% of the crop produced on the agreed land to the company only.',
    'I will follow the technical guidance provided by the company regarding seeds, fertilizers, and pest control.',
    'I will use all materials (seeds, fertilizers, etc.) provided by the company only for the agreed crop.',
    'I agree to harvest and deliver crops within the agreed timeline.',
    'I agree to repay any financial assistance received, as per the terms of the contract.',
    'I opt into the crop insurance policy offered under the contract (if applicable).',
    'I understand that unforeseen natural calamities may affect my obligations under this agreement.',
  ]

  const buyerTerms = [
    'I agree to purchase 100% of the agreed crop yield at the price mentioned in the contract.',
    'I will provide technical guidance to the farmer for effective crop production.',
    'I will supply quality seeds, fertilizers, and other necessary materials for the crop.',
    'I will provide financial assistance or credit facilities (if applicable).',
    'I agree to inspect and accept crops that meet the agreed quality standards.',
    'I will process payment to the farmer within the agreed timeline after crop delivery.',
    'I will offer crop insurance options to the farmer as part of the agreement (if applicable).',
    'I understand that unforeseen natural calamities may affect my obligations under this agreement.',
  ]
  const location = useLocation()
  const { formData, orderData } = location.state || {}
  console.log({ orderData: orderData })
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [contractData, setContractData] = useState({
    order: '',
    pricePerAcre: formData?.pricePerAcre || '',
    deliveryDate: orderData
      ? new Date(orderData?.deliveryDate).toISOString().split('T')[0]
      : '',
    transportationRequired: formData?.transportationRequired || false,
    paymentTerms: orderData ? orderData.paymentTerms : '',
    cropDetails: formData?.expectedCropsYields || '',
    customTerms: {
      farmerCustomTerms: [
        ...(orderData?.customTerms?.farmerCustomTerms?.filter((term) =>
          farmerTerms.includes(term)
        ) || []),
      ],
      buyerCustomTerms: [
        ...(orderData?.customTerms?.buyerCustomTerms?.filter((term) =>
          buyerTerms.includes(term)
        ) || []),
      ],
    },

    creatorSignature: '',
    deliveryLocation: formData?.deliveryLocation || '',
  })

  const [createOrderApi, { isLoading }] = useCreateOrderMutation()
  const [updateContract] = useUpdateContractMutation()
  const [updateOrder] = useUpdateOrderMutation()
  const [createContract] = useCreateContractMutation()
  const [farmerTermChecked, setFarmerTermChecked] = useState(
    orderData
      ? [
          orderData?.customTerms?.farmerCustomTerms?.includes(farmerTerms[0])
            ? true
            : false,
          orderData?.customTerms?.farmerCustomTerms?.includes(farmerTerms[1])
            ? true
            : false,
          orderData?.customTerms.farmerCustomTerms?.includes(farmerTerms[2])
            ? true
            : false,
          orderData?.customTerms?.farmerCustomTerms?.includes(farmerTerms[3])
            ? true
            : false,
          orderData?.customTerms?.farmerCustomTerms?.includes(farmerTerms[4])
            ? true
            : false,
          orderData?.customTerms?.farmerCustomTerms?.includes(farmerTerms[5])
            ? true
            : false,
          orderData?.customTerms?.farmerCustomTerms?.includes(farmerTerms[6])
            ? true
            : false,
          orderData?.customTerms?.farmerCustomTerms?.includes(farmerTerms[7])
            ? true
            : false,
        ]
      : new Array(farmerTerms.length).fill(false)
  )

  const [buyerTermChecked, setBuyerTermChecked] = useState(
    orderData
      ? [
          orderData?.customTerms.buyerCustomTerms.includes(buyerTerms[0])
            ? true
            : false,
          orderData?.customTerms.buyerCustomTerms.includes(buyerTerms[1])
            ? true
            : false,
          orderData?.customTerms.buyerCustomTerms.includes(buyerTerms[2])
            ? true
            : false,
          orderData?.customTerms.buyerCustomTerms.includes(buyerTerms[3])
            ? true
            : false,
          orderData?.customTerms.buyerCustomTerms.includes(buyerTerms[4])
            ? true
            : false,
          orderData?.customTerms.buyerCustomTerms.includes(buyerTerms[5])
            ? true
            : false,
          orderData?.customTerms.buyerCustomTerms.includes(buyerTerms[6])
            ? true
            : false,
          orderData?.customTerms.buyerCustomTerms.includes(buyerTerms[7])
            ? true
            : false,
        ]
      : new Array(buyerTerms.length).fill(false)
  )
  console.log({ farmerTermChecked: farmerTermChecked })
  console.log({ buyerTermChecked: buyerTermChecked })

  const [customFarmerTerms, setCustomFarmerTerms] = useState(
    orderData?.customTerms.farmerCustomTerms.filter(
      (term) => !farmerTerms.includes(term)
    ) || []
  )
  const [customBuyerTerms, setCustomBuyerTerms] = useState(
    orderData?.customTerms.buyerCustomTerms.filter(
      (term) => !buyerTerms.includes(term)
    ) || []
  )

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setContractData((prevData) => ({
        ...prevData,
        [name]: files[0], // Ensure the file is saved correctly
      }))
    } else {
      setContractData({
        ...contractData,
        [name]: value,
      })
    }
  }

  const handleTermCheckChange = (type, index) => {
    const terms = type === 'farmer' ? farmerTermChecked : buyerTermChecked
    const updatedChecked = [...terms]
    updatedChecked[index] = !updatedChecked[index]

    setContractData((prevData) => ({
      ...prevData,
      customTerms: {
        ...prevData.customTerms,
        [`${type}CustomTerms`]: updatedChecked[index]
          ? [
              ...prevData.customTerms[`${type}CustomTerms`],
              (type === 'farmer' ? farmerTerms : buyerTerms)[index],
            ]
          : prevData.customTerms[`${type}CustomTerms`].filter(
              (term) =>
                term !== (type === 'farmer' ? farmerTerms : buyerTerms)[index]
            ),
      },
    }))

    type === 'farmer'
      ? setFarmerTermChecked(updatedChecked)
      : setBuyerTermChecked(updatedChecked)
  }

  const handleAddCustomTerm = (type) => {
    type === 'farmer'
      ? setCustomFarmerTerms([...customFarmerTerms, ''])
      : setCustomBuyerTerms([...customBuyerTerms, ''])
  }

  const handleCustomTermChange = (type, index, value) => {
    const terms =
      type === 'farmer' ? [...customFarmerTerms] : [...customBuyerTerms]
    terms[index] = value
    type === 'farmer' ? setCustomFarmerTerms(terms) : setCustomBuyerTerms(terms)
  }
  const handleRemoveField = (i, type) => {
    const terms =
      type === 'farmer'
        ? customFarmerTerms.filter((item, index) => index !== i)
        : customBuyerTerms.filter((item, index) => index !== i)
    type == 'farmer' ? setCustomFarmerTerms(terms) : setCustomBuyerTerms(terms)
  }
  const generateContract = async (e) => {
    e.preventDefault()

    const buyerterms = [
      ...contractData.customTerms.buyerCustomTerms,
      ...customBuyerTerms,
    ]

    const farmerterms = [
      ...contractData.customTerms.farmerCustomTerms,
      ...customFarmerTerms,
    ]

    setContractData((prevData) => ({
      ...prevData,
      customTerms: {
        buyerCustomTerms: buyerterms,
        farmerCustomTerms: farmerterms,
      },
    }))

    const formD = new FormData()
    formD.append('cropDetails', JSON.stringify(contractData.cropDetails))
    formD.append(
      'customTerms',
      JSON.stringify({
        buyerCustomTerms: buyerterms,
        farmerCustomTerms: farmerterms,
      })
    )
    formD.append(
      'deliveryLocation',
      JSON.stringify(contractData.deliveryLocation)
    )
    formD.append('pricePerAcre', contractData.pricePerAcre)
    formD.append('deliveryDate', contractData.deliveryDate)
    formD.append('paymentTerms', contractData.paymentTerms)
    formD.append(
      'transportationRequired',
      contractData.transportationRequired === 'included' ? false : true
    )
    formD.append('creatorSignature', contractData.creatorSignature) // Add file here

    try {
      const transportationRequired =
        formData.transportationRequired === 'included' ? false : true
      const res = orderData?.order
        ? await updateOrder({
            ...formData,
            _id: orderData.order._id,
            transportationRequired: transportationRequired,
          }).unwrap()
        : await createOrderApi({
            ...formData,
            transportationRequired: transportationRequired,
          }).unwrap()
      console.log({ res: res })
      formD.append('order', res._id)
      if (orderData) {
        formD.append('_id', orderData._id)
      }
      console.log(...formD)
      const res2 = orderData
        ? await updateContract(formD).unwrap()
        : await createContract(formD).unwrap()
      console.log({ res2: res2 })
      toast.success(
        orderData
          ? 'Contract updated successfully.'
          : 'Contract generated successfully.'
      )

      navigate('/contractMarket')
    } catch (error) {
      toast.error(error?.data?.message)
    }

    // Clear custom terms after submission
    setCustomBuyerTerms([])
    setCustomFarmerTerms([])
  }

  return (
    <form id="contractForm" className="orderForm" onSubmit={generateContract}>
      <h2 className="h2">Contract Form</h2>
      <div className="ipDivContainer">
        <div className="ipDiv">
          <label htmlFor="deliveryDate">Expected Delivery Date:</label>
          <input
            type="date"
            name="deliveryDate"
            value={contractData.deliveryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="ipDiv">
          <label htmlFor="paymentTerms">Payment Terms:</label>
          <select
            name="paymentTerms"
            onChange={handleChange}
            value={contractData.paymentTerms}
            required
          >
            <option value="">Select payment term</option>
            <option value="advance">Advance</option>
            <option value="partial">Partial</option>
            <option value="on-delivery">On Delivery</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="h4">I Agree to:</h3>
        <div className="termsContainer">
          {(formData?.orderFor === 'buyer' ? farmerTerms : buyerTerms).map(
            (term, i) => (
              <label className="checkContainer" key={i}>
                <input
                  type="checkbox"
                  checked={
                    formData?.orderFor === 'buyer'
                      ? farmerTermChecked[i]
                      : buyerTermChecked[i]
                  }
                  onChange={() =>
                    handleTermCheckChange(
                      formData?.orderFor === 'buyer' ? 'farmer' : 'buyer',
                      i
                    )
                  }
                />
                {term}
              </label>
            )
          )}
          {(formData?.orderFor === 'buyer'
            ? customFarmerTerms
            : customBuyerTerms
          ).map((customTerm, i) => (
            <div className="ipDivContainer customTerms">
              <div className="ipDiv" key={i}>
                <label htmlFor={`customTerm${i}`}>Custom Term {i + 1}:</label>
                <input
                  type="text"
                  value={customTerm}
                  onChange={(e) =>
                    handleCustomTermChange(
                      formData?.orderFor === 'buyer' ? 'farmer' : 'buyer',
                      i,
                      e.target.value
                    )
                  }
                  required
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  handleRemoveField(
                    i,
                    formData?.orderFor === 'buyer' ? 'farmer' : 'buyer'
                  )
                }
                className="deleteBtn"
              >
                <TiDeleteOutline />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAddCustomTerm(
                formData?.orderFor === 'buyer' ? 'farmer' : 'buyer'
              )
            }
            className="add"
            style={{ marginLeft: '1em', marginTop: '5px' }}
          >
            Add Custom Term
          </button>
        </div>

        <h3 className="h4">The Other Party Must Agree to:</h3>
        <div className="termsContainer">
          {(formData?.orderFor === 'buyer' ? buyerTerms : farmerTerms).map(
            (term, i) => (
              <label className="checkContainer" key={i}>
                <input
                  type="checkbox"
                  checked={
                    formData?.orderFor === 'buyer'
                      ? buyerTermChecked[i]
                      : farmerTermChecked[i]
                  }
                  onChange={() =>
                    handleTermCheckChange(
                      formData?.orderFor === 'buyer' ? 'buyer' : 'farmer',
                      i
                    )
                  }
                />
                {term}
              </label>
            )
          )}

          {(formData?.orderFor === 'buyer'
            ? customBuyerTerms
            : customFarmerTerms
          ).map((customTerm, i) => (
            <div className="ipDivContainer customTerms">
              <div className="ipDiv" key={i}>
                <label htmlFor={`customOtherTerm${i}`}>
                  Custom Term {i + 1}:
                </label>
                <input
                  type="text"
                  value={customTerm}
                  onChange={(e) =>
                    handleCustomTermChange(
                      formData?.orderFor === 'buyer' ? 'buyer' : 'farmer',
                      i,
                      e.target.value
                    )
                  }
                  required
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  handleRemoveField(
                    i,
                    formData?.orderFor === 'buyer' ? 'buyer' : 'farmer'
                  )
                }
                className="deleteBtn"
              >
                <TiDeleteOutline />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAddCustomTerm(
                formData?.orderFor === 'buyer' ? 'buyer' : 'farmer'
              )
            }
            className="add"
            style={{ marginLeft: '1em', marginTop: '5px' }}
          >
            Add Custom Term
          </button>
        </div>
      </div>
      {orderData && (
        <a
          href={`${BASE_URL}/${orderData.creatorSignature.replace(
            'uploads\\',
            ''
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Creator's Signature
        </a>
      )}

      <div className="ipDiv">
        <label htmlFor="creatorSignature">Upload Your Signature:</label>
        <input
          type="file"
          accept="image/*"
          name="creatorSignature"
          onChange={handleChange}
        />
      </div>

      <div className="gnrtCntrctContainer">
        <button type="submit" className="subBtn btn gnrtCntrct">
          Generate Contract
          <GrNext />
        </button>
      </div>
    </form>
  )
}

export default ContractForm
