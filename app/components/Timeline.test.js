import React from 'react'
import chai, {expect} from 'chai'
import {shallow} from 'enzyme'
import {spy} from 'sinon'
import {createStore} from 'redux'

chai.use(require('sinon-chai'))
chai.use(require('chai-enzyme'))
