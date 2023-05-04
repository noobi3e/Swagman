import React from 'react'
import { SecurePaymentIcon } from '../icons/SecurePayment'
import { Discount } from '../icons/Discount'
import { FreeDeliveryIcon } from '../icons/FreeDelivery'
import { QualityIcon } from '../icons/QualityIcon'

export const CompanyFeatures: React.FC = () => {
  return (
    <>
      <div className='features'>
        <div className='features__feature'>
          <SecurePaymentIcon className='features__icon' />
          <h4 className='features__title'>100% Secure Payments</h4>
        </div>

        <div className='features__feature'>
          <Discount className='features__icon' />
          <h4 className='features__title'>15% Discount on first 100 orders</h4>
        </div>

        <div className='features__feature'>
          <FreeDeliveryIcon className='features__icon' />
          <h4 className='features__title'>
            Free Delivery on orders above ₹999
          </h4>
        </div>

        <div className='features__feature'>
          <QualityIcon className='features__icon' />
          <h4 className='features__title'>100% Herbal products</h4>
        </div>
      </div>
    </>
  )
}
